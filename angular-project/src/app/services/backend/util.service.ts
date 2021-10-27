import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UTIL_API } from './api/util.api';

@Injectable({ providedIn: 'root' })
export class UtilService {

    constructor(private _httpc: HttpClient) { }


    getAllCountries(): Observable<any> {
        return this._httpc.get(UTIL_API.getAllCountries());
    }

    getAllStatesOfCountry(countryId: number): Observable<any> {
        return this._httpc.get(UTIL_API.getAllStatesOfCountry(countryId))
    }

    getAllCitiesOfState(stateId: number): Observable<any> {
        return this._httpc.get(UTIL_API.getAllCitiesOfState(stateId));
    }
}
