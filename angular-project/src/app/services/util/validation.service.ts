import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({ providedIn: 'root' })
export class ValidationUtils {

    constructor(private _auth: AuthenticationService) {
        this.asyncEmailValidate = this.asyncEmailValidate.bind(this);
    }


    static EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    required(control: AbstractControl): { [key: string]: any } | null {
        return (!control.value || !control.value.trim()) ? { missingVal: true } : null
    }

    passwordValidation(control: AbstractControl): { [key: string]: any } | null {
        return null;
    }

    crossValidate(group: AbstractControl): { [key: string]: any } | null {
        if (group instanceof FormGroup) {
            const controls = Object.values(group.controls);
            if (controls[0].value && (controls[1].dirty || controls[1].touched)) {
                return (controls[0].value === controls[1].value) ? null : { mismatch: true }
            }
            return null;
        }
        return null;
    }

    validEmail(control: AbstractControl): { [key: string]: any } | null {
        return control.value && !ValidationUtils.EMAIL_REGEX.test(control.value.toLowerCase()) ? { invalidEmail: true } : null
    }

    asyncEmailValidate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this._auth.validateRegisterationName(control.value).pipe(map(res => ((res) ? { emailExists: true } : null)));
    }
}
