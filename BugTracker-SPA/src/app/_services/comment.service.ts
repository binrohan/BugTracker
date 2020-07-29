import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommentRes } from '../_models/CommentRes';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  getComments(ticketId: number, commentParams?): Observable<CommentRes>{
    let params = new HttpParams();

    if (commentParams !=  null) {
      params = params.append('orderBy', commentParams.orderBy);
      params = params.append('filter', commentParams.filter);
      params = params.append('pageSize', commentParams.pageSize);
      params = params.append('pageIndex', commentParams.pageIndex);
    }

    return this.http.get<CommentRes>(this.baseUrl + 'comments/' + ticketId, {observe: 'response', params})
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }

  addComment(comment: {}){
    return this.http.post(this.baseUrl + 'comments', comment);
  }
}
