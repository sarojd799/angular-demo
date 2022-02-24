import { Component, ElementRef, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import HTMLUtils from 'app/services/util/htmlUtils';
import { SessionService } from 'app/services/util/session.service';
import { WebSocketUtils } from 'app/services/util/web-socket.service';

@Component({
    selector: '#chat-screen-right',
    templateUrl: './chat-screen-right-section.component.html',
    styleUrls: ['../chat.component.scss']
})
export class ChatScreenRightSectionComponent implements OnInit {

    @Output() onSettingBackClick: EventEmitter<any> = new EventEmitter();

    _selectedUser: any;

    currentUser: string = '';

    @ViewChild('chatBody') chatBody!: ElementRef<any>;


    @Input()
    set selectedUser(value: any) {
        if (this.connected) this._wsUtils.disconnect();
        if (this._session.getUserName() !== value) {
            this._selectedUser = value;
            this.connect();
        }
    }

    connected = false;

    messageCollection: any[] = [];

    chatInput = '';

    settingMenuOpened = false;

    onBackClick() {
        this.settingMenuOpened = false;
        this.onSettingBackClick.emit();
    }


    constructor(
        private _wsUtils: WebSocketUtils,
        private _session: SessionService,
        private _htmlUtils: HTMLUtils
    ) { }


    ngOnInit() {
        this.currentUser = this._session.getUserName();
    }

    connect() {
        if (this._selectedUser) {
            const currUser = this._session.getUserDetails();
            this._wsUtils.connect(
                this.onConnected.bind(this),
                this.onConError.bind(this),
                this.onMessageReceived.bind(this)
            );
        }
    }


    recipientKeyUp = false;
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
        if (msg && msg.trim()) {
            const message = {
                messageId: Math.random(),
                message: msg,
                sender: this._session.getUserName(),
                receipent: this._selectedUser.email,
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
    onConnected() {
        this.connected = true;
        this._wsUtils.registerKeyEvents(this.onReceipentKeyUp.bind(this), this.onReceipentBlur.bind(this))

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

    onConError(err: any) {
        alert('ERROR occurred' + JSON.stringify(err));
        console.log(err);
    }

    ngOnDestroy() {
        this._wsUtils.disconnect();
        this.connected = false;
    }

}
