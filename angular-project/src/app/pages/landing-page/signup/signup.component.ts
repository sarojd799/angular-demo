import { AfterContentInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { RequiredFieldsMatchers } from 'src/app/services/util/material-form-validators.util';
import { ValidationUtils } from 'src/app/services/util/validation.service';
import { signupValidationMsg } from '../validation-messages';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { AuthenticationService } from 'app/services/auth/authentication.service';

import { ToastrService } from 'app/services/util/toastr.utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../landing-page.component.scss'],
  animations: [
    trigger('formVisibilityState', [
      state("true", style({ opacity: 1 })),
      state("false", style({ opacity: 0 })),
      transition('false => true', animate('200ms ease-in')),
      transition('true => false', animate('100ms ease-in'))
    ])
  ]
})
export class SignUpComponent implements OnInit, AfterContentInit {

  @Output() onDialogEvent = new EventEmitter();

  signUpFormErr: any = {};

  signUpAsyncErr = '';

  dialogRef: unknown;

  matcher = new RequiredFieldsMatchers();

  formSubmitted = false;

  mounted = 'false'

  constructor(
    private fb: FormBuilder,
    private validationUtils: ValidationUtils,
    private _auth: AuthenticationService,
    private _toastr: ToastrService,
  ) { }

  ngAfterContentInit() {
    this.mounted = 'true'
  }

  ngOnInit() {
    this.registerFormValListener();
  }

  signupForm = this.fb.group({
    email: [
      '',
      {
        validators: [this.validationUtils.required, this.validationUtils.validEmail],
        asyncValidators: [this.validationUtils.asyncEmailValidate],
        upateOn: 'change'
      }
    ],
    passwordGroup: this.fb.group({
      password: ['', [this.validationUtils.required]],
      confirmPassword: ['', [this.validationUtils.required]]
    }, { validators: this.validationUtils.crossValidate })
  })

  registerFormValListener() {
    this.signupForm.valueChanges.pipe(debounceTime(300)).subscribe(v => this.validateRegisterForm(this.signupForm))
  }

  validateRegisterForm(signupForm: FormGroup, event = '') {
    Object.keys(signupForm.controls).forEach((controlName) => {
      const control = signupForm.controls[controlName];
      this.signUpFormErr[controlName] = '';
      if (control instanceof FormControl && control.invalid) {
        for (const errorKey in control.errors) {
          const msgNode = Reflect.get(signupValidationMsg, controlName);
          if (msgNode && msgNode[errorKey]) {
            this.signUpFormErr[controlName] = msgNode[errorKey];
          }
        }
      } else if (control instanceof FormGroup) {
        if (control.invalid) {
          const msgNode = Reflect.get(signupValidationMsg, controlName)
          for (const groupErrorKey in control.errors) {
            this.signUpFormErr[controlName] = msgNode[groupErrorKey] || '';
          }
        }
        this.validateRegisterForm(control, event);
      }
    })
  }

  switchForms() {
    this.signUpFormErr = {};
    this.signUpAsyncErr = ''
    this.signupForm.reset();
    this.onDialogEvent.emit('SWITCH_LOGIN');
  }

  validateRegisteration(signupForm: FormGroup) {
    this.formSubmitted = true;
    this.signUpFormErr = {};
    if (signupForm.invalid) {
      this.validateRegisterForm(signupForm, 'submit');
    } else {
      const payload = {
        username: this.username?.value,
        password: this.password?.value
      }
      this._auth.registerNewUser(payload).subscribe((res: any) => {
        if (res && res.email) {
          this._toastr.success("Registeration successfull")
          this.signupForm.reset();
          this.signupForm.markAsPristine();
          this.signupForm.markAsUntouched();
          this.signUpFormErr = {};
        } else {
          this._toastr.error("Error occurred while registering user.")
        }
      }, () => this._toastr.error("Error occurred while registering user."))
    }
  }


  get username() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('passwordGroup')?.get('password') }
}
