import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private projectIdSource = new BehaviorSubject(undefined);
  currentProjectId = this.projectIdSource.asObservable();
constructor() { }

setProjectId(id: number) {
  this.projectIdSource.next(id);
}

}
