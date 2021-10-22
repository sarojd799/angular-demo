import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'chat-left-section',
    templateUrl: './chat-screen-left-section.component.html',
    styleUrls: ['../chat.component.scss']
})
export class ChatScreenLeftSectionComponent implements OnInit {


    @Output() onUserSelect: EventEmitter<any> = new EventEmitter();

    @Input() prevChatList: any;

    prevChats = [
        'Dev', 'test', 'Chinmay Panda', 'Ashish Sahu', 'Jaggu Panda', 'Sourav Guru', 'Pratyush padhi', 'Suraj Gagrai'
    ].map(u => ({
        username: u,
        chat: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem, aspernatur soluta dicta reiciendis, quae recusandae eaque in aut ab libero nam! Ratione error nemo doloremque dolores harum deleniti sint neque.'
    }))


    prevChatFiltered: any = [];

    selectedUserToChat: any;

    constructor() { }

    ngOnInit(): void {
        this.prevChatFiltered = this.prevChats;
    }

    filterPrevChat(event: any) {
        if (!event.target.value) {
            this.prevChatFiltered = this.prevChats;
            return;
        }
        this.prevChatFiltered = this.prevChats.filter((item: any) => {
            return item.username.toUpperCase().includes(event.target.value.toUpperCase())
        })
    }


    selectUserToChat(user: any) {
        this.selectedUserToChat = user;
        this.onUserSelect.emit(user);
    }

}
