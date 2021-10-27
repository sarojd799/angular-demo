import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: '#chat-screen-left',
    templateUrl: './chat-screen-left-section.component.html',
    styleUrls: ['../chat.component.scss']
})
export class ChatScreenLeftSectionComponent implements OnInit {


    @Output() onUserSelect: EventEmitter<any> = new EventEmitter();

    @Input()
    set prevChatList(val: any) {
        this.prevChats = val;
        this.prevChatFiltered = val;
    }

    prevChats = []

    prevChatFiltered: any = [];

    selectedUserToChat: any;

    constructor() { }

    ngOnInit(): void { }

    filterUsersToChat(value: any) {
        if (!value) {
            this.prevChatFiltered = this.prevChats;
        } else {
            this.prevChatFiltered = this.prevChats.filter((c: any) => {
                return c.email.toUpperCase().includes(value.toUpperCase())
            })
        }
    }


    selectUserToChat(user: any) {
        this.selectedUserToChat = user;
        this.onUserSelect.emit(user);
    }

}
