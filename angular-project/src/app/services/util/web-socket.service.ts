import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as StompJS from 'stompjs';
import { environment as env } from 'src/environments/environment';

export class WebSocketUtils {

    webSocketEndPoint = 'http://localhost:8080/ws'
    topic = '/topic/connect/'
    stompClient: any;

    roomID!: string;

    connect(
        roomID: string,
        connectedCB: (arg: any) => void,
        errorHandler: (arg: any) => void,
        messageHandler: (arg: any) => void) {

        if (window && !window.location.host.includes('localhost')) {
            this.webSocketEndPoint = env.localIP + '/ws'
        }
        console.log('Initializing web socket');
        this.roomID = roomID;
        let ws = new SockJS(this.webSocketEndPoint);

        this.stompClient = StompJS.over(ws);
        this.stompClient.connect({}, (frame: any) => {

            connectedCB(this.send);
            console.log('User subscribed to ' + (this.topic));
            this.stompClient.subscribe(this.topic + roomID, (sdkEvent: any) => {
                messageHandler(sdkEvent);
            })

        }, errorHandler)
    }

    disconnect() {
        if (this.stompClient && this.roomID) this.stompClient.unsubscribe();
        console.log('Disconnected.!!!')
    }

    send(message: any) {
        this.stompClient.send(`/app/hello/` + this.roomID, {}, JSON.stringify(message));
    }
}