import * as SockJS from 'sockjs-client';
import * as StompJS from 'stompjs';
import { environment as env, environment } from 'src/environments/environment';

export class WebSocketUtils {

    webSocketEndPoint = `${environment.backendHost}/ws`
    topic = '/topic/connect/'
    stompClient: any;

    roomID!: string;

    connect(
        roomID: string,
        connectedCB: (arg: any) => void,
        errorHandler: (arg: any) => void,
        messageHandler: (arg: any) => void) {

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