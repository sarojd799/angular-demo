import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: '[app-burger-menu]',
    templateUrl: './burger-menu.component.html',
    styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenu {

    burgerMenuClicked!: boolean;

    @Output() onBurgerClick: EventEmitter<boolean> = new EventEmitter();

    onBurgerMenuClick() {
        this.burgerMenuClicked = !this.burgerMenuClicked;
        this.onBurgerClick.emit(this.burgerMenuClicked);
    }
}
