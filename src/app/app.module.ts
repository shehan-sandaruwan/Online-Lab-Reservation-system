import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandpageComponent } from './landpage/landpage.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AvailabilityComponent } from './availability/availability.component';
import { MessageComponent } from './message/message.component';
import { MyAppDirective } from './directives/my-app.directive';
import { FormsModule } from '@angular/forms';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { LabserviceService} from '../services/labservice.service';
import { AuthService} from '../services/auth.service';
import { LoginComponent } from './login/login.component';
import { ValidationRegisterService} from '../services/validation-register.service';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { NavbarComponent } from './navbar/navbar.component';
import { LabAComponent } from './lab-a/lab-a.component';
import {AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import {PagerefreshService} from '../services/pagerefresh.service';
import { Observable } from 'rxjs';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LandpageComponent,
    SignupComponent,
    HomeComponent,
    ReservationComponent,
    AvailabilityComponent,
    MessageComponent,
    MyAppDirective,
    LoginComponent,
    NavbarComponent,
    LabAComponent,
    AdminComponent,
  
  
   
  ],
  imports: [
    BrowserModule,  
    FormsModule,
    DlDateTimePickerDateModule,
    HttpModule,
    RouterModule.forRoot([
  {
        path:'',
        component:LandpageComponent
      },
      {
      path:'signup',
      component:SignupComponent
      },
      {
        path:'Home',
        component:HomeComponent,
        canActivate: [AuthGuard] 
      },
      {
        path:'reservation',
        component:ReservationComponent,
        canActivate: [AuthGuard] 
      },
      {
        path:'available',
        component: AvailabilityComponent,
        canActivate: [AuthGuard] 

      },
      {
        path:'message',
        component:MessageComponent,
        canActivate: [AuthGuard] 
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'labA',
        component:LabAComponent,
        canActivate: [AuthGuard] 
      },
      {
      path:'admin',
      component:AdminComponent,
      canActivate: [AuthGuard] 
      }
    ]),
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/login/']
      }
    }),
  
  ],
  providers: [FormsModule,LabserviceService, ValidationRegisterService ,AuthService,AuthGuard,PagerefreshService],
  bootstrap: [AppComponent]
})

export class AppModule { }
