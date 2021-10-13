import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingPageComponent } from './landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent,
        LandingPageComponent
    ],
    imports: [
        SharedModule
    ],
})
export class LandingPageModule { }
