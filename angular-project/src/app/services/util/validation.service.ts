import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ValidationService {
    static validInputValidator(control: AbstractControl): { [key: string]: any } | null {
        const fieldVal = control.value;
        return (!fieldVal || !fieldVal.trim()) ? { missingVal: true } : null
    }
}
