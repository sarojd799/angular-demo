import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CHAT_API } from './api/chat.api';

@Injectable({ providedIn: 'root' })
export class ChatBEService {

    constructor(private _httpc: HttpClient) { }

    getSavedChats(senderId: number, receipentId: number): Observable<any> {
        return this._httpc.get(CHAT_API.getSavedChats(senderId, receipentId))
    }
}
