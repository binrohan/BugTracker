import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../_models/Ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTicket(id: number){
    return this.http.get<Ticket>(this.baseUrl + 'tickets/' + id);
  }

  getTickets(isArchived: boolean): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.baseUrl + 'tickets/list/' + isArchived);
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
