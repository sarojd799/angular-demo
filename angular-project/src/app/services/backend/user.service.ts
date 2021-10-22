import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_API } from '../util/api.enum';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private _httpc: HttpClient) { }

    searchUserByUserName(username: string): Observable<any> {
        return this._httpc.get(USER_API.searchUser(username))
    }
}
