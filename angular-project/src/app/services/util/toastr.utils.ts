import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar"

@Injectable({ providedIn: 'root' })
export class ToastrService {

    dialogConfig: MatSnackBarConfig = {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right'

    }


    info(message: string, config: any = this.dialogConfig) {
        return this._snackBar.open(message, undefined, config);
    }

    success(message: string, config: any = this.dialogConfig) {
        return this._snackBar.open(message, undefined, config);
    }

    error(message: string, config: any = this.dialogConfig) {
        return this._snackBar.open(message, undefined, config);
    }

    constructor(private _snackBar: MatSnackBar) { }
}
