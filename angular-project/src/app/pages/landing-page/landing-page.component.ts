import { Component, ViewChild } from '@angular/core';

/*-Angular-Animations-*/
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

@Component({
    selector: 'landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

    @ViewChild('formsContainer') formsContainer!: ComponentType<any>;

    currentForm = 'login'

    dialogRef!: MatDialogRef<any, any>;

    constructor(private _dialog: MatDialog) { }

    showLoginDialog() {
        this.dialogRef = this._dialog.open(this.formsContainer, {
            autoFocus: false,
            disableClose: true
        });
    }

    handleDialogEvent(event: any) {

        if (event === 'SWITCH_SIGNUP') {
            this.currentForm = 'signup';
        } else if (event === 'SWITCH_LOGIN') {
            this.currentForm = 'login';
        } else {
            this.dialogRef.close();
        }
    }
}
