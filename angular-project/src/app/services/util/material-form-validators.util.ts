import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";


/*
    A class that will validate the material input invalid or error state;
*/
class RequiredFieldsMatchers implements ErrorStateMatcher {
    isErrorState(c: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const formSubmitted = (form && form.submitted);
        if (c && c.parent && c.parent !== c.root) { //Email
            const controls = Object.values(c.parent.controls);
            if (c === controls[controls.length - 1]) {
                if (c.invalid) {
                    return !!(c.invalid && ((c.dirty || c.touched) || formSubmitted));
                } else if (c.parent.invalid) {
                    return !!(c.parent.invalid && ((c.parent.dirty || c.parent.touched) || formSubmitted));
                }
            }
        }
        return !!(c && c.invalid && ((c.dirty || c.touched) || formSubmitted));
    }
}

export {
    RequiredFieldsMatchers
}