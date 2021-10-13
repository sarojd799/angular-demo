import { Injectable } from '@angular/core';
import { BasicAuthType } from 'src/app/types/common.types';

@Injectable({ providedIn: 'root' })
export class SessionService {

  persistenceKey = 'angularApp';

  saveUserCredentials(authDTO: BasicAuthType) {
    this.addItem(this.authKey, authDTO);
  }

  clearCredentials() {
    if (!this.storage) this.initStorage();
    let sessionData = this.storage[this.persistenceKey];
    if (!sessionData) return;
    sessionData = JSON.parse(sessionData);
    delete sessionData[`${this.authKey}`]
    this.storage[this.persistenceKey] = JSON.stringify(sessionData);
  }

  getItem(key: String) {
    let session = this.storage[this.persistenceKey];
    const sessionData = session ? JSON.parse(session) : {};
    return sessionData[`${key}`];
  }

  removeItem(key: String) {
    if (this.storage) this.storage.removeItem(`${key}`);
  }

  addItem(key: String, value: any) {
    let data = this.storage[this.persistenceKey];
    if (!data) this.initStorage();
    data = JSON.parse(this.storage[this.persistenceKey]);
    data[`${key}`] = JSON.stringify(value);
    this.storage[this.persistenceKey] = JSON.stringify(data);
  }

  initStorage() {
    this.storage[this.persistenceKey] = JSON.stringify({});
  }

  get storage() { return sessionStorage }
  get authKey() { return 'Authentication' }
}
