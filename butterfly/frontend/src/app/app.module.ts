import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PublicModule } from './public/public.module';
// import { PublicComponent } from './public/public.component';
// import { PublicComponent } from './public/public.component';
// import { AuthenticationComponent } from './authentication/authentication.component';
// import { LoginComponent } from './authentication/login/login.component';
// import { SignupComponent } from './authentication/signup/signup.component';
// import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    PublicModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
