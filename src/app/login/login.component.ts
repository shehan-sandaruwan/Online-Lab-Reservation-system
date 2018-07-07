import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationRegisterService } from '../../services/validation-register.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import {NavbarService} from '../../services/navbar.service';
import { Observable, of, observable } from 'rxjs';
import {Auth} from '../../Auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:String;
  password:String;
  authdata:Observable<Auth[]>
  labApage$: Observable<boolean>;
  constructor(
    public nav:NavbarService,
    private validation:ValidationRegisterService,
    private auth:AuthService,
    private router:Router,
    private flashmessagesservice:FlashMessagesService,
  ) {
    nav.labApage.next(false);
   }

  ngOnInit() {
    this.nav.show();
  }
  onLoginuserSubmit(){
    const user = {
    email:this.email,
    password:this.password
    }
     // required field for makesure submitted data in valid form
     
     if(!this.validation.loginValidation(user)){
       this.flashmessagesservice.show("enter the valid data in order to proceed", { cssClass: 'alert-danger', timeout: 3000 });
       return false;
     }
     if(!this.validation.validateEmail(user.email)){
       this.flashmessagesservice.show("please use valid email", { cssClass: 'alert-danger', timeout: 3000 });
       return false;
     }
     
     //Login user
       this.auth.loginUser(user).subscribe(data=>{
           console.log(data.user);
           this.auth.storeUserData(data.token,data.email,data.user);
           this.flashmessagesservice.show("you are loggin", { cssClass: 'alert-success', timeout: 3000 });
           this.router.navigate(['/Home']);
      },
      err =>{
        this.flashmessagesservice.show("Enter Valid Email Or Password in order to proceed..!", { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      }
    ); 

  }
}
