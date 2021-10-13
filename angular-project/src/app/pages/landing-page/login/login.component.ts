import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { SessionService } from 'src/app/services/util/session.service';
import { ValidationUtils } from 'src/app/services/util/validation.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { LOGIN_ERROR_CODES } from './login.const';
import { EventEmitter } from '@angular/core';
import { dialogConfig } from '../lading-page-const';
import { RequiredFieldsMatchers } from 'src/app/services/util/material-form-validators.util';
import { loginValidations } from '../validation-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../landing-page.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() onDialogEvent = new EventEmitter();

  loginErrorMsg = '';

  loginForm = this.fb.group({
    username: ['', [ValidationUtils.required]],
    password: ['', [ValidationUtils.required]],
  })

  loginFormErr: any = {}

  matcher = new RequiredFieldsMatchers();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _session: SessionService,
    private _auth: AuthenticationService,
    private _snackBar: MatSnackBar) { }

  authenticate(payload: any) {
    this._auth.loginUser(payload).subscribe(res => {
      console.log({ res });
      if (res.message === LOGIN_ERROR_CODES.invalidCredentials) {
        this.loginErrorMsg = 'Invalid username or password';
      } else {
        this.onDialogEvent.emit('CLOSE');
        this._session.saveUserCredentials(payload);
        this.router.navigate(['home', 'student'])
        this._snackBar.open(`Welcome ${payload.username}`, undefined, dialogConfig);
      }
    })
  }

  ngOnInit(): void {
    this.registerFormValChangeListener();
  }

  registerFormValChangeListener() {
    this.loginForm.valueChanges.subscribe(val => this.checkLoginValidationErrors(this.loginForm))
  }


  switchForms() {
    this.loginFormErr = {};
    this.loginForm.reset();
    this.loginForm.markAsPristine();
    this.onDialogEvent.emit('SWITCH_SIGNUP');
  }

  checkLoginValidationErrors(loginForm: FormGroup, event: String = '') {
    this.loginFormErr = {};
    Object.keys(loginForm.controls).forEach((fieldName: string) => {
      const control = loginForm.get(fieldName) || { invalid: false, touched: false };
      if (control.invalid) {
        for (const errorKey in control.errors) {
          const msgNode = Reflect.get(loginValidations, fieldName);
          if (msgNode) {
            this.loginFormErr[fieldName] = msgNode[errorKey];
          }
        }
      }
    });
  }

  validateLoginForm(loginForm: FormGroup) {
    this.loginErrorMsg = ''
    if (loginForm.invalid) {
      this.checkLoginValidationErrors(loginForm, 'submit');
    } else {
      this.authenticate(loginForm.value);
    }
  }

}
