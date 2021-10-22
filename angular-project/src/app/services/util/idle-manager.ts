import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Injectable({ providedIn: 'root' })
export class IdleManagerService {

    idleState: any;
    timeOut!: boolean;
    lastPing: any;

    constructor(
        private idle: Idle,
        private keepalive: Keepalive,
        private _router: Router
    ) { }

    init() {
        // sets an idle timeout of 5 seconds, for testing purposes.
        this.idle.setIdle(5);

        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        this.idle.setTimeout(5);

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
        console.log('called===========================================================')
        this.idle.onTimeout.subscribe(() => {
            this.idleState = 'Timed out!';
            this.timeOut = true;
            console.log(this.idleState);
            this._router.navigate(['/']);
        });

        this.idle.onIdleStart.subscribe(() => {
            this.idleState = 'You\'ve gone idle!'
            console.log(this.idleState);
        });

        this.idle.onTimeoutWarning.subscribe((countdown) => {
            this.idleState = 'You will time out in ' + countdown + ' seconds!'
            console.log(this.idleState);
        });

        this.idle.onIdleEnd.subscribe(() => {
            this.idleState = 'No longer idle.'
            console.log(this.idleState);
            this.reset();
        });

        this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
    }
    //         if (userLoggedIn) idle.watch() :idle.stop();
}
