import * as SockJS from 'sockjs-client';
import * as StompJS from 'stompjs';
import { environment as env, environment } from 'src/environments/environment';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class WebSocketUtils {


    constructor(private _session: SessionService) { }

    webSocketEndPoint = `${environment.backendHost}/secured/room`
    topic = '/topic/connect/'
    stompClient: any;

    events: any = [];
    errorHandler: any;
    connected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    endPointPrefix = '/spring-security-mvc-socket';
    chatEndPoints: any = {
        register: `${this.endPointPrefix}/registerForChat`,
        send: `${this.endPointPrefix}/secured/room`,
        onKeyUp: `${this.endPointPrefix}/chatEvent/type`,
        blur: `${this.endPointPrefix}/chatEvent/blur`
    }


    connect(
        //events: any,
        connectedCB: (arg: any) => void,
        errorCB: (arg: any) => void) {
        this.errorHandler = errorCB;
        //this.events = events;
        const url = this.webSocketEndPoint;
        const currUser = this._session.getUserDetails();
        let ws = new SockJS(url);
        console.log(ws);

        this.stompClient = StompJS.over(ws);
        this.stompClient.connect({
            login: currUser.email
        }, (frame: any) => {
            connectedCB(this.send);
            this.connected.next(true);
            this.printSessionID();
            this.registerUser(this._session.getUserDetails());
        }, (error: any) => {
            this.connected.next(false);
            errorCB(error);
        })
    }


    printSessionID() {
        let url = this.stompClient.ws._transport.url;
        console.log("transport url: " + this.stompClient.ws._transport.url);
        url = url.replace(`${env.webSocketHost}/spring-security-mvc-socket/secured/room/`, "");
        url = url.replace("/websocket", "");
        url = url.replace(/^[0-9]+\//, "");
        const sessionId = url.slice(url.lastIndexOf("/") + 1, url.length);
        console.log("Your current session is: " + sessionId);
    }

    subscribeToAppEvents() {
        //for app notifications    
    }

    subscribeToChatMessages(messageHandler: (message: any) => void) {
        this.stompClient.subscribe('/user/queue/message', (sdkEvent: any) => messageHandler(sdkEvent))
    }

    registerKeyEvents(keyUpHandler: any, blurHandler: any) {
        this.stompClient.subscribe('/user/queue/keyup', (sdkEvent: any) => keyUpHandler())
        this.stompClient.subscribe('/user/queue/blur', (sdkEvent: any) => blurHandler())
    }

    /**
     * @description To register principal with email
     * @param loggedInUser 
     */
    registerUser(loggedInUser: any = {}) {
        this.stompClient.send(this.chatEndPoints.register, {}, JSON.stringify({ sender: loggedInUser.email }));
    }

    send(message: any) {
        this.stompClient.send(this.chatEndPoints.send, {}, JSON.stringify(message));
    }

    /**
     * @description When logged in user types something
     * @param payload 
     */
    onKeyUp(payload: any) {
        this.stompClient.send(this.chatEndPoints.onKeyUp, {}, JSON.stringify(payload));
    }

    /**
     * @description When logged in user blurs the text field
     * @param payload 
     */
    onBlur(payload: any) {
        this.stompClient.send(this.chatEndPoints.blur, {}, JSON.stringify(payload));
    }

    disconnect() {
        if (this.stompClient && this.events) this.stompClient.unsubscribe();
    }
}