import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BurgerMenu } from './burger-menu/burger-menu.component';
import { SearchComponent } from './search/search.component';


@NgModule({
    declarations: [
        BurgerMenu,
        SearchComponent
    ],
    imports: [
        SharedModule
    ],
    providers: [],
    exports: [
        SearchComponent,
        BurgerMenu
    ]
})
export class CommonComponentsModule { }
