import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/Project';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getProjects(isArchived: boolean) {
    return this.http.get<Project[]>(this.baseUrl + 'projects/list/' + isArchived);
  }
  getProject(id: any): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + 'projects/' + id);
  }
  addProject(id: any, project: Project) {
    return this.http.post(this.baseUrl + 'projects/' + id + '/add', project);
  }
}
