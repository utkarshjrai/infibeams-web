import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { UserStoreService } from '../user-store.service';
import { Router } from '@angular/router';

// import { SocialAuthService , GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'infibeams-web';
  signinForm: FormGroup;
  user: User;
  allUsers: any;
  loggedIn: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userStoreService: UserStoreService) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.validateLogin().subscribe((user: any) => {
      this.allUsers = user.usersCredentials;
    });
  }

  signIn(): void {
    const user = this.allUsers.filter((x: any) => x.email === this.signinForm.value.email && x.password === this.signinForm.value.password);
    if (user.length > 0) {
      const loggedInUser = {name: user[0].name, email: user[0].email};
      // Storing user to the user store so to make it available at every location.
      this.userStoreService.user = new User(loggedInUser);
      this.router.navigate(['home']);
    } else {
      window.alert('Wrong username or password');
    }
  }
}
