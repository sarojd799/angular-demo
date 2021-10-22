import { NgModule } from '@angular/core';
import { LogOutDirective } from 'app/directives/logout.directive';
import { SharedModule } from 'app/shared/shared.module';
import { CommonComponentsModule } from '../components/components.module';
import { ContainerComponent } from './container.component';


//ngx


@NgModule({
    declarations: [
        ContainerComponent,
        LogOutDirective,
    ],
    imports: [
        SharedModule,
        CommonComponentsModule
    ],
    providers: [],
    exports: [
        LogOutDirective
    ]
})
export class ContainerModule { }
