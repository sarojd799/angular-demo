import { Component, OnDestroy, OnInit, SimpleChange, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/services/backend/user.service';
import { SessionService } from 'app/services/util/session.service';
import { interval, Observable, Subscription } from 'rxjs';

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

  interval!: Subscription;

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
    this.interval = interval(2000).subscribe(res => this.getAllConnections(this._session.getUserDetails()));
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
    if (this.interval) this.interval.unsubscribe();
  }

}
