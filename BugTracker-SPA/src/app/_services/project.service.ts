import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/Project';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProjectRes } from '../_models/ProjectRes';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProjects(projectParams?): Observable<ProjectRes>{
    let params = new HttpParams();

    if (projectParams != null){
      params = params.append('orderBy', projectParams.orderBy);
      params = params.append('stateBy', projectParams.stateBy);
      params = params.append('filter', projectParams.filter);
      if (projectParams.pageSize !== undefined){
        params = params.append('pageSize', projectParams.pageSize);
      } else {params = params.append('pageSize', '0');
      }
      params = params.append('pageIndex', projectParams.pageIndex);
    }

    return this.http.get<ProjectRes>(this.baseUrl + 'admin/projects', {observe: 'response', params})
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }

  getProject(id: any): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + 'projects/' + id);
  }

  addProject(project: Project) {
    return this.http.post(this.baseUrl + 'projects/add', project);
  }

  assignUsers(id: number, users: {}){
    return this.http.put(this.baseUrl + 'projects/' + id + '/assign', users);
  }

  archiveProject(id: number){
    return this.http.put(this.baseUrl + 'projects/archive/' + id, {});
  }

  updateProject(id: number, updateProject: {}){
    return this.http.put(this.baseUrl + 'projects/' + id, updateProject);
  }
}
