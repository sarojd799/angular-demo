import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BurgerMenu } from './burger-menu/burger-menu.component';
import { SearchComponent } from './search/search.component';
import { UserIconComponent } from './user-icon/user-icon.component';


@NgModule({
    declarations: [
        BurgerMenu,
        SearchComponent,
        UserIconComponent
    ],
    imports: [
        SharedModule
    ],
    providers: [],
    exports: [
        SearchComponent,
        BurgerMenu,
        UserIconComponent
    ]
})
export class CommonComponentsModule { }
