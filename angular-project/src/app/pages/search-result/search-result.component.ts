import { Component } from '@angular/core';
import { UserService } from 'app/services/backend/user.service';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SessionService } from 'app/services/util/session.service';
import { ToastrService } from 'app/services/util/toastr.utils';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  userInput: string = '';

  userInputObs: BehaviorSubject<string> = new BehaviorSubject('');

  loggedInUser: any;

  constructor(
    private _userService: UserService,
    private _session: SessionService,
    private _toastr: ToastrService) { }

  searchResult: any[] = []


  ngOnInit() {
    this.populateData();
    this.registerListeners();
  }

  addToConnection(user: any) {
    console.log({ user });
    this._userService.saveNewConnection({
      userId: this._session.getUserDetails().userDetailsId,
      user
    }).pipe(
      switchMap(res => this._userService.getSearchResultForUserWithKeyword(this._session.getUserId(), this.userInput))
    ).subscribe(res => {
      this._toastr.success('Added to connection')
      this.handleResponse(res)
    }, err => this._toastr.error('Error occurred'));
  }

  populateData() {
    this.loggedInUser = this._session.getUserDetails();
  }

  registerListeners() {
    if (this.userInputObs) {
      this.userInputObs.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((val: any) => {
          if (val) {
            return this._userService.getSearchResultForUserWithKeyword(this._session.getUserId(), val)
          }
          return of(0)
        })
      ).subscribe(res => this.handleResponse(res));
    }
  }

  handleResponse(res: any) {
    console.log('executingg', res);
    this.searchResult = res || [];
  }

  handleSearchChange(value: any) {
    this.userInputObs.next(value);
    this.userInput = value;
  }
}
