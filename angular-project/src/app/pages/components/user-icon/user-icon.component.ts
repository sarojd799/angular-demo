import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef } from '@angular/core'

@Component({
    selector: '.user-icon__component',
    templateUrl: './user-icon.component.html',
    styleUrls: ['./user-icon.component.scss']
})
export class UserIconComponent {

    imageStyle: any = null;

    imgURL!: string;

    constructor(
        private cdr: ChangeDetectorRef
    ) { }

    @Input()
    set imageURL(val: string) {
        if (val && this.imgURL !== val) {
            this.imgURL = `${environment.backendHost}/images/${val}`
            this.imageStyle = {
                'background-image': `url(${this.imgURL} )`
            }
        }
    }
}
