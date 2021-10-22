import { Component, DoCheck, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ValidationUtils } from 'src/app/services/util/validation.service';
import { trigger, state, transition, animate, style } from '@angular/animations';

import { MatSnackBar } from '@angular/material/snack-bar';
import { LOGIN_ERROR_CODES } from './login.const';
import { EventEmitter } from '@angular/core';
import { dialogConfig } from '../lading-page-const';
import { RequiredFieldsMatchers } from 'src/app/services/util/material-form-validators.util';
import { loginValidations } from '../validation-messages';
import { debounceTime } from 'rxjs/operators';

import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../landing-page.component.scss'],
  animations: [
    trigger('formVisibilityState', [
      state("true", style({ opacity: 1 })),
      state("false", style({ opacity: 0 })),
      transition('false => true', animate('300ms ease-in')),
      transition('true => false', animate('100ms ease-in'))
    ])
  ]
})
export class LoginComponent implements OnInit, DoCheck {

  @Output() onDialogEvent = new EventEmitter();

  loginErrorMsg = '';

  currentForm!: string;

  loginForm = this.fb.group({
    username: ['', [this.validationUtils.required]],
    password: ['', [this.validationUtils.required]],
  })

  loginFormErr: any = {}

  oauthCreds: any = {};

  mounted = "false";

  matcher = new RequiredFieldsMatchers();

  ngDoCheck() {
    this.mounted = 'true';
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthenticationService,
    private _snackBar: MatSnackBar,
    private validationUtils: ValidationUtils,
    private _socialAuth: SocialAuthService) { }


  signInWithGoogle(): void {
    try {
      this._socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
    } catch (err) {
      console.log(err)
    }
  }

  authenticate(payload: any) {
    this._auth.loginUser(payload).subscribe(res => {
      console.log({ res });
      if (res.message === LOGIN_ERROR_CODES.invalidCredentials) {
        this.loginErrorMsg = 'Invalid username or password';
      } else {
        this.onDialogEvent.emit('CLOSE');
        console.log({ name: payload.username })
        this._auth.saveUserCredentials({ ...res, username: payload.username });
        if (res.roles && res.roles.includes('ADMIN')) {
          this.router.navigateByUrl('admin/adminDashboard')
        } else {
          this.router.navigate(['home', 'posts'])
        }
        this._snackBar.open(`Welcome ${payload.username}`, undefined, dialogConfig);
      }
    })
  }

  ngOnInit(): void {
    this.registerFormValChangeListener();
    this.checkForExistingOAuth();
  }

  registerFormValChangeListener() {
    this.loginForm.valueChanges.pipe(debounceTime(300)).subscribe(val => this.checkLoginValidationErrors(this.loginForm))
  }

  registerOAuthStateListener() {
    this._socialAuth.authState.subscribe((res: any) => {
      this.oauthCreds = res;
      console.log({ res })
    }, (err) => {
      console.error(err);
    }, () => console.log('completed'));
  }

  checkForExistingOAuth() {
    if (this._socialAuth) {
      console.log({ auth: this._socialAuth })
    }
  }


  switchForms() {
    this.loginFormErr = {};
    this.loginForm.reset();
    this.loginForm.markAsPristine();
    this.onDialogEvent.emit('SWITCH_SIGNUP');
  }

  checkLoginValidationErrors(loginForm: FormGroup, event: String = '') {
    this.loginFormErr = {};
    this.loginErrorMsg = '';
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
