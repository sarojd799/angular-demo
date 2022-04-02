import { Component, OnDestroy, OnInit, SimpleChange, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/services/backend/user.service';
import { SessionService } from 'app/services/util/session.service';

import { interval, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit, OnDestroy {

  userSelected = false;

  prevChatList = [];

  selectedUser: any = {};

  apiInterval: any;

  constructor(
    private _userService: UserService,
    private _session: SessionService
  ) { }

  getAllConnections(user: any) {
    if (user) {
      this._userService.getAllConnectionsOfUser(user.userDetailsId).subscribe(
        res => {
          if (res && res.length && JSON.stringify(res) !== JSON.stringify(this.prevChatList)) {
            this.prevChatList = res;
            this.checkActiveUserStatus(res);
          }
        }
      );
    }
  }

  checkActiveUserStatus(users: any) {
    if (this.selectedUser) {
      const match = users.find((u: any) => u.userDetailsId === this.selectedUser.userDetailsId);
      if (match && JSON.stringify(match) !== JSON.stringify(this.selectedUser)) {
        this.selectedUser = match;
      }
    }
  }


  registerInterval() {
    this.apiInterval = interval(5000).pipe(tap(
      () => this.getAllConnections(this._session.getUserDetails())
    )).subscribe();
  }

  ngOnInit() {
    console.warn("registed call api")
    this.registerInterval();
  }


  selectUserToChat(user: any) {
    this.selectedUser = user;
    this.userSelected = true;
  }

  onMobBackClick() {
    this.userSelected = false;
  }


  ngOnDestroy() {
    if (this.apiInterval) {
      this.apiInterval.unsubscribe();
    }
  }

}
