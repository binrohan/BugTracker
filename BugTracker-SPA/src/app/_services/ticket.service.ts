import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ticket } from '../_models/Ticket';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TicketRes } from '../_models/TicketRes';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTicket(id: number){
    return this.http.get<Ticket>(this.baseUrl + 'tickets/' + id);
  }

  getUserTickets(id: string, ticketParams?): Observable<TicketRes>{

    let params = new HttpParams();

    if (ticketParams != null){
      params = params.append('orderBy', ticketParams.orderBy);
      params = params.append('isArchived', ticketParams.isArchived);
      params = params.append('filter', ticketParams.filter);
      params = params.append('pageSize', ticketParams.pageSize);
      params = params.append('pageIndex', ticketParams.pageIndex);
    }

    return this.http.get<TicketRes>(this.baseUrl + 'tickets/' + id + '/list', {observe: 'response', params})
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }

  addTicket(ticket: Ticket){
    return this.http.post(this.baseUrl + 'tickets', ticket);
  }

  updateTicket(id: number, ticket: {}){
    return this.http.put(this.baseUrl + 'tickets/update/' + id, ticket);
  }

  assignTicket(id: number, user: {}){
    return this.http.put(this.baseUrl + 'tickets/assign/' + id, user);
  }
}
