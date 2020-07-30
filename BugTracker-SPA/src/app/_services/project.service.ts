import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/Project';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getProjects(isArchived: boolean): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl + 'projects/list/' + isArchived);
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
}
