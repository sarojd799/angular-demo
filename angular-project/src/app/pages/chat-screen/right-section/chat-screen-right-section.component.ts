import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import HTMLUtils from 'app/services/util/htmlUtils';
import { SessionService } from 'app/services/util/session.service';
import { WebSocketUtils } from 'app/services/util/web-socket.service';

@Component({
    selector: 'chat-right-section',
    templateUrl: './chat-screen-right-section.component.html',
    styleUrls: ['../chat.component.scss']
})
export class ChatScreenRightSectionComponent implements OnInit, OnChanges {

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

    constructor(
        private _wsUtils: WebSocketUtils,
        private _session: SessionService,
        private _htmlUtils: HTMLUtils
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes) {
            console.log({ changes })
        }
    }



    ngOnInit() {
        this.currentUser = this._session.getUserName();
    }

    connect() {
        if (this._selectedUser) {
            this._wsUtils.connect(
                `101`,
                this.onConnected.bind(this),
                this.onConError.bind(this),
                this.onMessageReceived.bind(this)
            );
        }
    }


    sendMessage(msg: string) {
        if (msg && msg.trim()) {
            this._wsUtils.send({
                messageId: Math.random(),
                message: msg,
                sender: this._session.getUserName(),
                receipent: this._selectedUser,
                timeStamp: new Date()
            });

            this._htmlUtils.scrollToBottomOfDiv(this.chatBody);
            this.chatInput = ''
        }
    }

    onConnected(sendHandler: () => void) {
        this.connected = true;
    }

    onMessageReceived(message: any) {
        let { body } = message;
        if (body) {
            body = JSON.parse(body);
            this._htmlUtils.scrollToBottomOfDiv(this.chatBody);
            this.chatInput = ''
            this.messageCollection.push(body);
        }
    }

    onConError(err: any) {
        alert('ERROR ' + JSON.stringify(err));
        console.error(err);
    }

    ngOnDestroy() {
        this._wsUtils.disconnect();
        this.connected = false;
    }

}
