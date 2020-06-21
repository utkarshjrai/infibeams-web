import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // providers: [{
  //   provide: 'SocialAuthServiceConfig',
  //   useValue: {
  //     autoLogin: false,
  //     providers: [
  //       // {
  //       //   id: GoogleLoginProvider.PROVIDER_ID,
  //       //   provider: new GoogleLoginProvider(
  //       //     '211726082022-gfdcr3sj5hjmrn9f4m1e23cs8m4koojd.apps.googleusercontent.com'
  //       //   ),
  //       // }
  //     ],
  //   } as SocialAuthServiceConfig,
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }
