import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingPageComponent } from './landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';

import { SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialLoginModule } from 'angularx-social-login';

@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent,
        LandingPageComponent
    ],
    imports: [
        SharedModule,
        SocialLoginModule
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            "217556807604-mtskvp6r5rvpc8rlm10s9vdlj8kjlg56.apps.googleusercontent.com"
                        )
                    }
                ]
            } as SocialAuthServiceConfig,
        }
    ]
})
export class LandingPageModule { }
