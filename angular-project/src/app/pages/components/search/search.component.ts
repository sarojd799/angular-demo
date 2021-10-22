import { Component, ElementRef, Output, ViewChild, EventEmitter, AfterViewChecked, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Component({
    selector: 'search-component',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    @Output() onChage: EventEmitter<any> = new EventEmitter();

    searchInput: string = '';

    searchInputHandler(newVal: any) {
        this.onChage.emit(newVal);
    }

    onClear() {
        this.searchInput = '';
    }
}
