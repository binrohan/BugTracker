import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  updateUserRole(uId: string, roles: {}){
    return this.http.post(this.baseUrl + 'admin/editRoles/' + uId, roles);
  }
}
