import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RequiredFieldsMatchers } from 'src/app/services/util/material-form-validators.util';
import { ValidationUtils } from 'src/app/services/util/validation.service';
import { signupValidationMsg } from '../validation-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../landing-page.component.scss'],
})
export class SignUpComponent implements OnInit {

  @Output() onDialogEvent = new EventEmitter();

  signUpFormErr: any = {};

  signUpAsyncErr = '';

  dialogRef: unknown;

  matcher = new RequiredFieldsMatchers();

  formSubmitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerFormValListener();
  }

  signupForm = this.fb.group({
    email: ['', [ValidationUtils.required, ValidationUtils.validEmail]],
    passwordGroup: this.fb.group({
      password: ['', [ValidationUtils.required]],
      confirmPassword: ['', [ValidationUtils.required]]
    }, { validators: ValidationUtils.crossValidate })
  })


  registerFormValListener() {
    this.signupForm.valueChanges.subscribe(v => this.validateRegisterForm(this.signupForm))
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
      console.log('User registered')
      alert('User registered.')
    }

  }
}
