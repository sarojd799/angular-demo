import { Component, ElementRef, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { ChatBEService } from 'app/services/backend/chat.service';
import HTMLUtils from 'app/services/util/htmlUtils';
import { SessionService } from 'app/services/util/session.service';
import { WebSocketUtils } from 'app/services/util/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
    selector: '#chat-screen-right',
    templateUrl: './chat-screen-right-section.component.html',
    styleUrls: ['../chat.component.scss']
})
export class ChatScreenRightSectionComponent implements OnInit {

    @Output() onSettingBackClick: EventEmitter<any> = new EventEmitter();

    _selectedUser: any;

    currentUser: any;

    connected: boolean = false;

    @ViewChild('chatBody') chatBody!: ElementRef<any>;

    messageCollection: any[] = [];

    chatInput = '';

    settingMenuOpened = false;

    recipientKeyUp = false;

    @Input()
    set selectedUser(value: any) {
        if (this._session.getUserName()) {
            this._selectedUser = value;
        }
    }


    initChatConfig() {
        this._wsUtils.connected.subscribe(flag => this.onConnected(flag));
        this.currentUser = this._session.getUserDetails();
    }

    onBackClick() {
        this.settingMenuOpened = false;
        this.onSettingBackClick.emit();
    }


    constructor(
        private _wsUtils: WebSocketUtils,
        private _session: SessionService,
        private _htmlUtils: HTMLUtils,
        private _chatService: ChatBEService
    ) { }


    ngOnInit() {
        this.initChatConfig();
        this.getChatMessages()
    }

    getChatMessages() {
        this.messageCollection = []
        this._chatService.getSavedChats(this.currentUser.userDetailsId, this._selectedUser.userDetailsId).subscribe(res => {
            this.messageCollection = [...res];
        })
    }

    onKeyUp() {
        this._wsUtils.onKeyUp({ receipent: this._selectedUser.email });
    }

    onReceipentKeyUp() {
        this.recipientKeyUp = true;
    }

    onBlur() {
        this._wsUtils.onBlur({ receipent: this._selectedUser.email })
    }

    onReceipentBlur() {
        this.recipientKeyUp = false;
    }


    sendMessage(msg: string) {
        const loggedInUser = this._session.getUserDetails()
        if (msg && msg.trim()) {
            const message = {
                messageId: Math.random(),
                messageContent: msg,
                sender: loggedInUser.email,
                receipent: this._selectedUser.email,
                senderId: loggedInUser.userDetailsId,
                receipentId: this._selectedUser.userDetailsId,
                timeStamp: new Date()
            }
            this._wsUtils.send(message);
            this.messageCollection.push(message);
            this._htmlUtils.scrollToBottomOfDiv(this.chatBody, 'chat-body');
            this.chatInput = ''
        }
    }

    /**
     * @description Method will be used to assign subscriptions
     */
    onConnected(flag: boolean) {
        this.connected = flag;
        if (flag) {
            this._wsUtils.subscribeToChatMessages(this.onMessageReceived.bind(this));
            this._wsUtils.registerKeyEvents(this.onReceipentKeyUp.bind(this), this.onReceipentBlur.bind(this));
        }
    }

    onMessageReceived(message: any) {
        let { body } = message;
        if (body) {
            body = JSON.parse(body);
            this._htmlUtils.scrollToBottomOfDiv(this.chatBody, 'chat-body');
            this.chatInput = ''
            this.messageCollection.push(body);
        }
    }
}
