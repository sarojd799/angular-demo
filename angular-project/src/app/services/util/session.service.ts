import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {

  persistenceKey = 'angularApp';

  clearCredentials() {
    if (!this.storage) this.initStorage();
    let sessionData = this.storage[this.persistenceKey];
    if (!sessionData) return;
    sessionData = JSON.parse(sessionData);
    delete sessionData[`${this.authKey}`]
    this.storage[this.persistenceKey] = JSON.stringify(sessionData);
  }

  saveUserDetails(details: any) {
    this.appendValueToKey(this.authKey, { user: details });
    this.updateUserName(details.email);
  }

  updateUserName(username: string) {
    this.appendValueToKey(this.authKey, { username });
  }

  updateSessionToken(token: string) {
    this.appendValueToKey(this.authKey, { token })
  }

  getUserDetails(): any {
    const auth = this.getItem(this.authKey) || {};
    return auth.user;
  }

  getUserName() {
    const auth = this.getItem(this.authKey) || {};
    return auth.username;
  }

  getUserId() {
    const auth = this.getItem(this.authKey) || {};
    return auth.user && auth.user.userDetailsId;
  }

  getItem(key: String) {
    let session = this.storage[this.persistenceKey];
    const sessionData = session ? JSON.parse(session) : {};
    return sessionData[`${key}`];
  }

  removeItem(key: String) {
    if (this.storage) this.storage.removeItem(`${key}`);
  }

  appendValueToKey(primaryKey: string, obj: any) {
    let data = this.storage[this.persistenceKey]; //angular app
    if (!data) this.initStorage();
    data = JSON.parse(this.storage[this.persistenceKey]); //angular app
    if (Reflect.get(data, primaryKey)) { //authkey
      data[primaryKey] = { ...data[primaryKey], ...obj }
    }
    this.storage[this.persistenceKey] = JSON.stringify(data);
  }

  addItem(key: String, value: any) {
    let data = this.storage[this.persistenceKey];
    if (!data) this.initStorage();
    data = JSON.parse(this.storage[this.persistenceKey]);
    data[`${key}`] = value;
    this.storage[this.persistenceKey] = JSON.stringify(data);
  }

  initStorage() {
    this.storage[this.persistenceKey] = JSON.stringify({});
  }

  get storage() {
    return sessionStorage;
  }
  get authKey() { return 'Authentication' }
}
