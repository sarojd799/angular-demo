import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { UserService } from 'app/services/backend/user.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinct, map, switchMap, filter, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';
import { SessionService } from 'app/services/util/session.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  userInput: string = '';
  loggedInUser = ''

  constructor(
    private _userService: UserService,
    private _actRoute: ActivatedRoute,
    private _session: SessionService) { }

  searchResult: any[] = []


  ngOnInit() {
    this.loggedInUser = this._session.getUserName();
  }

  handleResponse(res: any) {
    console.log({ res });
    this.searchResult = res || [];
  }

  handleSearchChange(value: any) {

  }
}
