import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/util/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formsToggle = false;
  loginForm = this.fb.group({
    username: ['', [ValidationService.validInputValidator]],
    password: ['', [ValidationService.validInputValidator]],
  })
  signupForm = this.fb.group({
    username: ['', [ValidationService.validInputValidator]],
    password: ['', [ValidationService.validInputValidator]],
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  slidePage() {
    this.formsToggle = !this.formsToggle;
    if (this.formsToggle) {
      this.loginForm.reset();
    } else {
      this.signupForm.reset()
    }
  }

  submitLoginForm() {
    console.log({ formVal: this.loginForm.value })
  }

  //===================getters====================//
  get username() { return this.loginForm.get('username'); }

  get loginPassword() { return this.loginForm.get('password'); }
}
