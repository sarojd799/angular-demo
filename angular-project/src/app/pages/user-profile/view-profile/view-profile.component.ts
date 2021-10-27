import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

    profile: any = {}

    constructor(
        private _actRoute: ActivatedRoute
    ) { }

    subscribeToProfileData() {
        this._actRoute.data.subscribe((profile: any) => {
            if (profile) {
                this.profile = profile;
            }
        })
    }

    ngOnInit() {
        console.log(this._actRoute.data);

        this.subscribeToProfileData();
    }
}
