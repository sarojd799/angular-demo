import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class UserDetailsManager {

    userDetails = new Subject<any>();


    constructor(private _session: SessionService) { }

    getUserDetails() {
        this._session.getUserDetails();
    }

    settUserDetails(details: any, updatedToken: any = null) {
        this._session.saveUserDetails(details);
        if (updatedToken) {
            this._session.updateSessionToken(updatedToken.slice(7))
        }
        this.userDetails.next(details);
    }

}
