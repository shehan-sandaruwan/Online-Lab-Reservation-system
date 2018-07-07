import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavbarService} from '../../services/navbar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  logo:string
  labApage$: Observable<boolean>;  
  constructor(
    private router:Router,
    public nav: NavbarService,
  ) {
    this.logo ="../assets/Images/logo.png";
   
   }

  ngOnInit() {
    this.nav.show();
    this.nav.labApage.next(false);
   
  }

  directLabA(){
    this.router.navigate(['/labA']);
  }


}
