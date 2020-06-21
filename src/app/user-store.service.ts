import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private readonly _user = new BehaviorSubject<User>(new User());
  public readonly userData = this._user.asObservable();

  constructor() { }

  // the getter will return the last value emitted in user subject
  get user() {
    return this._user.getValue();
  }

  // assigning a value to this.user will assign it to the observable
  // and down to all of its subsribers (ex: this.user = {})
  set user(val: User) {
    this._user.next(val);
  }
}
