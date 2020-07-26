import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ticket } from '../_models/Ticket';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTicket(id: number){
    return this.http.get<Ticket>(this.baseUrl + 'tickets/' + id);
  }

  getTickets(ticketParams?): Observable<Ticket[]>{

    let params = new HttpParams();

    if (ticketParams != null){
      params = params.append('orderBy', ticketParams.orderBy);
      params = params.append('isArchived', ticketParams.isArchived);
    }

    return this.http.get<Ticket[]>(this.baseUrl + 'tickets/list', {observe: 'response', params})
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }

  addTicket(ticket: Ticket){
    return this.http.post(this.baseUrl + 'tickets', ticket);
  }

  updateTicket(id: number, ticket: Ticket){
    return this.http.put(this.baseUrl + 'tickets/update/' + id, ticket);
  }

  assignTicket(id: number, user: {}){
    return this.http.put(this.baseUrl + 'tickets/assign/' + id, user);
  }
}
