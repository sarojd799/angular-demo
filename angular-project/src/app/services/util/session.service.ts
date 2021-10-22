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

  getUserName() {
    const auth = this.getItem(this.authKey) || {};
    return auth.username;
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
    data[`${key}`] = value;
    this.storage[this.persistenceKey] = JSON.stringify(data);
  }

  initStorage() {
    this.storage[this.persistenceKey] = JSON.stringify({});
  }

  get storage() { return localStorage }
  get authKey() { return 'Authentication' }
}
