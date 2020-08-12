import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../_models/Category';
import { environment } from 'src/environments/environment';
import { Status } from '../_models/Status';
import { Priority } from '../_models/Priority';
import { Counts } from '../_models/Counts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssistService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCate(){
    return this.http.get<Category[]>(this.baseUrl + 'assist/cate');
  }

  getSta(): Observable<Status[]> {
    return this.http.get<Status[]>(this.baseUrl + 'assist/sta');
  }

  getPri(){
    return this.http.get<Priority[]>(this.baseUrl + 'assist/pri');
  }

  setSta(sta: {}) {
    return this.http.post(this.baseUrl + 'assist/sta', sta);
  }

  setCate(cate: {}) {
    return this.http.post(this.baseUrl + 'assist/cate', cate);
  }

  setPri(pri: {}) {
    return this.http.post(this.baseUrl + 'assist/pri', pri);
  }

  removeCate(id: number) {
    return this.http.delete(this.baseUrl + 'assist/cate/' + id);
  }

  removeSta(id: number) {
    return this.http.delete(this.baseUrl + 'assist/sta/' + id);
  }

  removePri(id: number) {
    return this.http.delete(this.baseUrl + 'assist/pri/' + id);
  }

  getCounts(): Observable<Counts> {
    return this.http.get<Counts>(this.baseUrl + 'assist/counts');
  }
}
