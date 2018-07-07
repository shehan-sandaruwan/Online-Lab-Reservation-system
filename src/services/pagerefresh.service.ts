import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PagerefreshService {

  public isTableUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isTableDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
