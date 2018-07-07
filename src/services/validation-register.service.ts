import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationRegisterService {

  constructor() { }

  registerValidation(user){
    if(user.user_name == undefined || user.email == undefined || user.designation == undefined || user.password == undefined){
      return false;
    }
    else{
      return true;
    }
  }
  loginValidation(user){
    if(user.email == undefined  || user.password == undefined){
      return false;
    }
    else{
      return true;
    }
  }
  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  tabledataValidation(reservation){
    if( reservation.date == undefined || reservation.start == undefined || reservation.end == undefined){
      return false;
    }
    else{
      return true;
    }
  }
 serachValidation(searchValue){
  if(searchValue.Lab == undefined  || searchValue.date == undefined || searchValue.starttime == undefined){
    return false;
  }
  else{
    return true;
  }
  }
}
