import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible:boolean;
  public labApage = new BehaviorSubject<boolean>(false);
  constructor() {this.visible =false }

  hide() { this.visible = false; }

  show() { this.visible = true; }
}
