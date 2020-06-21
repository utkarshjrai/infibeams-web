import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserStoreService } from './user-store.service';
import { Router } from '@angular/router';
import { User } from './models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userStoreService: UserStoreService) { }

  validateLogin() {
    return this.httpClient.get('assets/users.json');
  }

  signOut(): void {
    this.userStoreService.user = new User();
    this.router.navigate(['login']);
    // this.authService.signOut();
  }

  isLoggedIn() {
    const user = this.userStoreService.user;
    if (user.email === '' || user.name === '') {
      return false;
    }else {
       return true;
    }
  }
}
