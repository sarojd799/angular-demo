import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_API } from './api/user.api';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private _httpc: HttpClient) { }

    searchUserByUserName(username: string): Observable<any> {
        return this._httpc.get(USER_API.searchUser(username))
    }


    saveNewConnection(payload: any): Observable<any> {
        return this._httpc.post(USER_API.addConnection(payload.userId), payload.user);
    }

    getAllConnectionsOfUser(userId: number): Observable<any> {
        return this._httpc.get(USER_API.getAllConnections(userId));
    }

    getSearchResultForUserWithKeyword(userId: number, keyword: string): Observable<any> {
        return this._httpc.get(USER_API.searchURIForUserConSearch(userId, keyword));
    }


    getUserProfileById(userId: number) {
        return this._httpc.get(USER_API.getProfileById(userId));
    }


    updateUserInfo(userId: number, payload: any): Observable<any> {
        return this._httpc.post(USER_API.updateUserInfo(userId), payload);
    }

    updateUserProfileImage(userId: number, imgData: any) {
        return this._httpc.post(USER_API.uploadUserProfileImg(userId), imgData);
    }

    updateUserStatus(userId: number, status: string) {
        return this._httpc.put(USER_API.updateUserStatus(userId), status);
    }

}
