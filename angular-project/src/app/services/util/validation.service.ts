import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationUtils {

    static EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    static required(control: AbstractControl): { [key: string]: any } | null {
        const fieldVal = control.value;
        return (!fieldVal || !fieldVal.trim()) ? { missingVal: true } : null
    }

    static crossValidate(group: AbstractControl): { [key: string]: any } | null {
        if (group instanceof FormGroup) {
            const controls = Object.values(group.controls);
            if (controls[0].value && (controls[1].dirty || controls[1].touched)) {
                return (controls[0].value === controls[1].value) ? null : { mismatch: true }
            }
            return null;
        }
        return null;
    }

    static validEmail(control: AbstractControl): { [key: string]: any } | null {
        if (control.value && !ValidationUtils.EMAIL_REGEX.test(control.value.toLowerCase())) {
            return { invalidEmail: true }
        }
        return null;
    }
}
