import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabserviceService {
  result;
  public labApage = new BehaviorSubject<boolean>(false);
  constructor() {}
    
}
