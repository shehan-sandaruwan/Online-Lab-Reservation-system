import { Component, OnInit,NgZone } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import { subscribeOn } from 'rxjs/operators';
import {TableDataService} from '../../services/table-data.service';
import {Reservation} from '../../Reservation';
import {RecentDetection} from '../../RecentDetection';
import {Update} from '../../Update';
import{NavbarService} from '../../services/navbar.service';
import { ValidationRegisterService } from '../../services/validation-register.service';
import {AuthService} from '../../services/auth.service';
import {EmailVal} from '../../EmailVal';
import { Observable } from 'rxjs';
import {PagerefreshService} from '../../services/pagerefresh.service';
@Component({
  selector: 'app-lab-a',
  templateUrl: './lab-a.component.html',
  styleUrls: ['./lab-a.component.css']
})
export class LabAComponent implements OnInit {
isTableUpdate:boolean = false;
isTableDelete: boolean;
isBooked:boolean =false;
labApage$: Observable<boolean>;
labval:String= "Lab-A";
 Email:String;
 reservations:Reservation[];
 Update: Array<any>;
 emailVal:EmailVal[];
 emailvalue:String;
 email:String;
 id:String;
 date:String;
 startTime:String;
 endTime:String;
 show:boolean = false;
 rows: Array<RecentDetection> = [];
 Aid:String;
 Adate:String;
 AstartTime:String;
 AendTime:String;
showAdmin:boolean = false;
  constructor(private table:TableDataService,
    private nav:NavbarService,
    private flashmessagesservice:FlashMessagesService,
    private validation:ValidationRegisterService,
    private auth:AuthService,
    private zone:NgZone,
    private refresh:PagerefreshService
  ) 
   
  { 
      nav.labApage.next(true);
      this.table.getReservation().subscribe(reservation =>{
      this.reservations = reservation;
      
    })
    const emailVal = {
      emailvalue: localStorage.getItem('email')
      }
      
      this.table.getByEmail(emailVal).subscribe(data =>{
       this.Update= data;
       console.log(this.Update.length);
     })

     if(localStorage.getItem('username')== "Admin"){
      this.showAdmin = true;
    }

    }


  clear(){
    this.show = false;
    this.Aid = null;
    this.Adate = null;
    this.AstartTime = null;
    this.AendTime = null;
  }

  addRow(){
  this.show = true;
  
  //this.rows.push( { _id:this.Aid, date: this.Adate, start:this.AstartTime, end: this.AendTime,  email:localStorage.getItem('email') } )
  const reservations = {
  lab:this.labval,
  date :this.Adate,
  start : this.AstartTime,
  end : this.AendTime,
  email: localStorage.getItem('email'),
  }
  this.isBooked = true;
 /* this.table.getReservation()
  .subscribe(reservation =>{
   this.reservations = reservation;
  })*/
 
if(!this.validation.tabledataValidation(reservations)){
  console.log("It's work");
  this.flashmessagesservice.show("enter the valid data in order to proceed", { cssClass: 'alert-danger', timeout: 3000 });
   return false;
 }

 this.table.setReservation(reservations).subscribe(data=>{

    this.flashmessagesservice.show("Successfully booked..!", { cssClass: 'alert-success', timeout: 10000 });
    this.table.getReservation().subscribe(reservation =>{
    this.reservations = reservation;
    })
    const emailVal = {
      emailvalue: localStorage.getItem('email')
      }
    this.table.getByEmail(emailVal).subscribe(data =>{
      this.Update= data;
     })
    },
    err =>{
      this.flashmessagesservice.show("This slot has already booked", { cssClass: 'alert-danger', timeout: 3000 });
      this.isBooked = true;
      this.table.getReservation().subscribe(reservation =>{
      this.reservations = reservation;
      });
    })
}
  updateRow(rowId){

    if(rowId!= null){
      this.id = rowId;
    }
    

    const updateRow = {
      _id:this.id,
      date:this.date,
      starttime:this.startTime,
      endtime:this.endTime

      }   
    this.table. patchReservation(updateRow).subscribe(data=>{
      if(data){
        this.flashmessagesservice.show("Successfully Updated..!", { cssClass: 'alert-success', timeout: 3000 });
      }
      else{
        this.flashmessagesservice.show("something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
      } 
    });
    this.isTableUpdate = true;
    this.table.getReservation().subscribe(reservation =>{
    this.reservations = reservation;
    console.log(localStorage.getItem('email'));
      
    })
    const emailVal = {
      emailvalue: localStorage.getItem('email')
      }
      console.log(emailVal);
      this.table.getByEmail(emailVal).subscribe(data =>{
       this.Update= data;
       console.log(this.Update.length);
     })
  }
  ngOnInit() {
    this.nav.show();
  
  }
}
