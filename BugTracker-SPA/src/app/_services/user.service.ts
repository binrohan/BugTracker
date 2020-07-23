import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getUserss() {
    return this.http.get<User[]>(this.baseUrl + 'users/');
  }
  getUser(id: any): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
  updateUser(id: string, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  getUsers(username: string, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3): Observable<User[]> {

    return this.http
      .get(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }
}
