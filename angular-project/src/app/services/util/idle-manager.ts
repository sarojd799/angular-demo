import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({ providedIn: 'root' })
export class IdleManagerService {

    idleState: any;
    timeOut!: boolean;
    lastPing: any;

    timeOutDuration!: number;



    constructor(
        public idle: Idle,
        private keepalive: Keepalive,
        private _router: Router,
        private _auth: AuthenticationService
    ) { }


    init(timeout: number) {
        console.log('init called');

        this.timeOutDuration = (!timeout || timeout == 0) ? 60 : timeout;

        // sets an idle timeout of 5 seconds, for testing purposes.
        this.idle.setIdle(this.timeOutDuration);

        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        this.idle.setTimeout(10);

        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        // sets the ping interval to 15 seconds
        this.keepalive.interval(15);

        this.subscribeToIdle()
    }

    reset() {
        this.idle.watch();
        this.timeOut = false;
    }


    subscribeToIdle() {
        console.log('idle subscribed called')

        this.idle.onTimeout.subscribe(() => {
            this.idleState = 'TIMED_OUT';
            this.timeOut = true;
            this._auth.logOutUser();
            console.log('logged out')
        });

        this.idle.onIdleStart.subscribe(() => {
            this.idleState = 'IDLE_START';
        });

        this.idle.onTimeoutWarning.subscribe((countdown) => {
            this.idleState = 'IDLE_WARNING'
            console.log("countdown begins")
        });

        this.idle.onIdleEnd.subscribe(() => {
            this.idleState = 'IDLE_END'
            this.reset();
        });

        this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

        this.idle.watch();

        this._router.events.subscribe((val) => {

            if (!location.pathname.includes("/index")) {
                this.idle.watch();
            } else {
                this.idle.stop();
            }
        });
    }
}
