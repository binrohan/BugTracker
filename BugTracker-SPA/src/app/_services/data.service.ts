import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  invokeProjectTable = new EventEmitter();
  subsVar: Subscription;


constructor() { }

  onProjectFormButtonClick() {
    this.invokeProjectTable.emit();
  }

}
