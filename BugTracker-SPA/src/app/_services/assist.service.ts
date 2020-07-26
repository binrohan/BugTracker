import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../_models/Category';
import { environment } from 'src/environments/environment';
import { Status } from '../_models/Status';
import { Priority } from '../_models/Priority';
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

  getSta(): Observable<Status> {
    return this.http.get<Status>(this.baseUrl + 'assist/sta');
  }

  getPri(){
    return this.http.get<Priority[]>(this.baseUrl + 'assist/pri');
  }
}
