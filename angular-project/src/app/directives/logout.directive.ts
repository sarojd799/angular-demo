import { Directive, HostListener, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/auth/authentication.service';

@Directive({ selector: '[logoutLink]' })
export class LogOutDirective implements OnInit {

    constructor(private _auth: AuthenticationService) { }

    @HostListener('click')
    onClick() {
        if (confirm('Are you sure?')) this._auth.logOutUser()
    }

    ngOnInit() { }
}