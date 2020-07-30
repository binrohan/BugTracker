import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectRes } from '../_models/ProjectRes';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  updateUserRole(uId: string, roles: {}){
    return this.http.post(this.baseUrl + 'admin/editRoles/' + uId, roles);
  }

  removeUser(id: string){
    return this.http.delete(this.baseUrl + 'admin/removeUser/' + id);
  }

  getProjects(projectParams?): Observable<ProjectRes>{
    let params = new HttpParams();

    if (projectParams != null){
      params = params.append('orderBy', projectParams.orderBy);
      params = params.append('stateBy', projectParams.stateBy);
      params = params.append('filter', projectParams.filter);
      params = params.append('pageSize', projectParams.pageSize);
      params = params.append('pageIndex', projectParams.pageIndex);
    }

    return this.http.get<ProjectRes>(this.baseUrl + 'admin/projects', {observe: 'response', params})
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }
}
