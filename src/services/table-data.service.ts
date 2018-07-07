import { Injectable } from '@angular/core';
import {Http,Headers, Jsonp} from '@angular/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {URLSearchParams} from '@angular/http';
import {RequestOptions} from '@angular/http';
import { HttpParams } from '@angular/common/http';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TableDataService  {

  reservation:any;
  emailVal:any[];
  Update:any[];
  constructor(private http:Http,private flashmessagesservice:FlashMessagesService,private router:Router) { }

  getReservation(){
    return this.http.get('http://localhost:3000/reservation/').pipe(map((response => response.json())));
  }
 
  setReservation(reservation){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/reservation/reserve',reservation,{headers:headers}).pipe(map((response:any)=> response.json()));  
    }
    patchReservation(Update){
     // let bodyString = JSON.stringify(Update); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option
      console.log("num "+ Update._id);
    
      return this.http
          .put('http://localhost:3000/reservation/'+Update._id,JSON.stringify(Update),options).pipe(map((response: any) => response.json()));   
      }
     
      getByEmail(emailVal){
       
        //const data = encodeURIComponent(emailVal.emailvalue);
        let params = new HttpParams();
        params = params.set('email',emailVal.emailvalue);
        //console.log(data);
        return this.http
            .get(`http://localhost:3000/reservation/${emailVal.emailvalue}`).pipe(map((response: any) =>response.json()));
           
    }   
        
        getSerachValues(searchvalue){
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          let params = new URLSearchParams(); 
          params.append("lab", searchvalue.Lab);
          params.append("date", searchvalue.date);
          params.append("starttime", searchvalue.starttime);

          console.log("num "+ searchvalue.Lab);
          return this.http.get('http://localhost:3000/reservation/search',{ headers: headers, search: params }).pipe(map((response: any) => response.json()));
              
        }

        deleteValues(id){
          return this.http
            .delete('http://localhost:3000/reservation/'+id).pipe(map((response: any) => response.json()));
        }
      
  }


