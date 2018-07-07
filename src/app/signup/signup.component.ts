import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationRegisterService } from '../../services/validation-register.service';
import {AuthService} from '../../services/auth.service';
 import {FlashMessagesService} from 'angular2-flash-messages/module';
 import {NavbarService} from '../../services/navbar.service';
 import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 isLoggedIn$: Observable<boolean>;
 isLoggedOut$:Observable<boolean>;
 username: String;
 designation:String;
 email:String;
 password:String; 
 labApage$: Observable<boolean>;
  constructor(
    private validationRegisterService:ValidationRegisterService,
    private authService:AuthService,
    private router:Router,
    private flashmessagesservice:FlashMessagesService,
    public nav:NavbarService
  ) 
  { 
    nav.labApage.next(false);
  }
  

  ngOnInit() {
    this.nav.show();
   
    console.log(this.isLoggedIn$);
  }
  onRegisterSubmit(){
    const user = {
      user_name:this.username,
      email:this.email,
      designation:this.designation,
      password:this.password

    }

    // required field for makesure submitted data in valid form

    if(!this.validationRegisterService.registerValidation(user)){
     this.flashmessagesservice.show("enter the valid data in order to proceed", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if(!this.validationRegisterService.validateEmail(user.email)){
      this.flashmessagesservice.show("please use valid email", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    //register userng
      this.authService.registerUser(user).subscribe(data=>{
        console.log("this is call");
        if(data){
          this.flashmessagesservice.show("you are register", { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
        }
        else{
          this.flashmessagesservice.show("something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
          this.router.navigate(['/signup']);
        }
      })
  }
}
