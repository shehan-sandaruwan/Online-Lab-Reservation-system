import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { Observable, of } from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
logo:String;
isLoggedIn$: Observable<boolean>; 
isLoggedOut$: Observable<boolean>;
labApage$: Observable<boolean>;
  constructor(public nav:NavbarService,public auth:AuthService,public router:Router) {
    this.logo ="../assets/Images/logo.png";
    this.labApage$ = nav.labApage;
   }

  ngOnInit() {
  }
  loginUser(){
    this.router.navigate(['/login']);
  }
  logoutUser(){
    this.nav.show();
    this.auth.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
