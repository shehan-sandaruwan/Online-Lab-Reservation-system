import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import {Reservation} from '../../Reservation';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import {TableDataService} from '../../services/table-data.service';
import {Update} from '../../Update';
import { ValidationRegisterService } from '../../services/validation-register.service';
import {AuthService} from '../../services/auth.service';
import {EmailVal} from '../../EmailVal';
import { Observable } from 'rxjs';
import {PagerefreshService} from '../../services/pagerefresh.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  reservations:Reservation[];
  isDeleted:boolean = false;
  deletevalue:[any];
  showAdmin:boolean = false;
  Aid:String;
  Adate:String;
  AstartTime:String;
  AendTime:String;
  show:boolean = false;
  isClear:boolean = false;
  constructor(public nav:NavbarService,
    private table:TableDataService,
    private flashmessagesservice:FlashMessagesService,
     private auth:AuthService,
     private validation: ValidationRegisterService
    )
    
     {
    this.table.getReservation().subscribe(reservation =>{
     this.reservations = reservation
   });
   if(localStorage.getItem('user')== "Admin"){
     this.showAdmin = true;
    
   }
  }

  ngOnInit() {
    this.nav.show();
  }

  search(lab,Adate,Astart){
    this.show = true;
    console.log(lab);
    console.log(Adate);
     const searchvalue = {
      Lab:lab,
      date:Adate,
      starttime:Astart
     }
     if(!this.validation.serachValidation(searchvalue)){
      this.flashmessagesservice.show("enter the valid data in order to proceed", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
     }
     this.isClear = true; // show table data after clear the serch values
     this.table.getSerachValues(searchvalue).subscribe(serchval=>{
       this.reservations =serchval;
     })
  }
  
  clear(){
    this.show = false;
    this.Aid = null;
    this.Adate = null;
    this.AstartTime = null;
    this.AendTime = null;
    //this.table.getReservation().subscribe(reservation =>{
      this.table.getReservation().subscribe(reservation =>{
        this.reservations = reservation
      });  
  }
  Delete(id){
   const reservations = this.reservations;

    if(id!= null){
      this.table.deleteValues(id).subscribe(deleteval=>{
      this.deletevalue = deleteval;

        if(this.deletevalue != null){
          this.flashmessagesservice.show("Successfully Updated..!", { cssClass: 'alert-success', timeout: 3000 });
        }
        else{
          this.flashmessagesservice.show("something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
        } 
      })
      for(let i = 0; i < reservations.length; ++i){
        if (reservations[i]._id === id) {
            reservations.splice(i,1);
        }
    }
      this.isDeleted = true;
     this.table.getReservation()
    .subscribe(reservation =>{
     this.reservations = reservation
     console.log(localStorage.getItem('email'));
   });
    }
  }
@ViewChild('content') content:ElementRef;
  downloadPdf(){
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element,renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;
    doc.text('This is the details of lab reservations',15,15);
    doc.fromHTML(content.innerHTML,15,15,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });
    doc.save('test.pdf');
  }
 
}
