import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Auth} from '../Auth';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import { Router } from '@angular/router';
import { Reservation } from '../Reservation';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private loggedIn = new BehaviorSubject<boolean>(false);
private loggedOut = new BehaviorSubject<boolean>(true);

authToken:any;
user:any;
email:any;
reservation:Reservation[];

get isLoggedIn() {
  return this.loggedIn.asObservable(); // {2}
}
get isLoggedOut(){
  return this.loggedOut.asObservable();
}
  constructor(private http:Http,public jwtHelper: JwtHelperService,private flashmessagesservice:FlashMessagesService,private router:Router) {}

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/signup',user,{headers:headers}).pipe(map((response: any) => response.json()));
  }
  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/login',user,{headers:headers}).pipe(map((response: any) => response.json()));
   }

  storeUserData(token,email,username){
    localStorage.setItem('id_token',token);
    localStorage.setItem('email',email);
    localStorage.setItem('user',username);
    this.authToken = token;
    this.email = email;
    this.user = username;
    console.log("token"+this.authToken);
    console.log("email"+this.email);
    console.log("username"+this.user);
    if(this.authToken!= null){
      this.loggedIn.next(true);
      this.loggedOut.next(false);
    }
     // this.router.navigate(['/home']);
    
  }
  storeReservationData(reservation){
    localStorage.setItem('resrvation',reservation);
    this.reservation = reservation;

  }

  
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('id_token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
  this.authToken = null;                          
  this.user = null;
  this.email = null;
  localStorage.clear();
  }
}
