import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getUsers(){
    return this.http.get<User[]>(this.baseUrl + 'users/');
  }
  getUser(id: any): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
  updateUser(id: string, user: User){
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }
}
