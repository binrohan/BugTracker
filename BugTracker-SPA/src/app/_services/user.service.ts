import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getUsers(userParams?): Observable<User[]>{

    let params = new HttpParams();

    if (userParams != null)
    {
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.http.get<User[]>(this.baseUrl + 'users/', {observe: 'response', params})
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }
  getUser(id: any): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
  updateUser(id: string, user: User){
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }
}
