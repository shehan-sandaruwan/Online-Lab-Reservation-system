import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.css']
})
export class LandpageComponent implements OnInit {
  image_path:string;
 
  constructor(private router:Router,private nav:NavbarService) {
    this.image_path = '../assets/Images/lab2.jpg';

   }

  ngOnInit() {
    this.nav.hide();
  }
showSignUp(){
  this.router.navigate(['/signup']);
}
showLogin(){
  this.router.navigate(['/login']);
}
}
