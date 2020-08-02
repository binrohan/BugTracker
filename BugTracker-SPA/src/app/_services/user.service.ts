import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRes } from '../_models/UserRes';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getUsers(userParams?): Observable<UserRes>{

    let params = new HttpParams();

    if (userParams != null)
    {
      params = params.append('orderBy', userParams.orderBy);
      params = params.append('stateBy', userParams.stateBy);
      params = params.append('filter', userParams.filter);
      params = params.append('pageSize', userParams.pageSize);
      params = params.append('pageIndex', userParams.pageIndex);
    }

    return this.http.get<UserRes>(this.baseUrl + 'users/', {observe: 'response', params})
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }


  getProjectUsers(id: number, userParams?): Observable<UserRes>{

    let params = new HttpParams();

    if (userParams != null)
    {
      params = params.append('orderBy', userParams.orderBy);
      params = params.append('stateBy', userParams.stateBy);
      params = params.append('filter', userParams.filter);
      params = params.append('pageSize', userParams.pageSize);
      params = params.append('pageIndex', userParams.pageIndex);
    }

    return this.http.get<UserRes>(this.baseUrl + 'users/' + id + '/project', {observe: 'response', params})
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
