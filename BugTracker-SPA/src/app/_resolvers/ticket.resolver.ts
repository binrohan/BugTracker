import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Ticket } from '../_models/Ticket';
import { Observable, of } from 'rxjs';
import { TicketService } from '../_services/ticket.service';
import { SnackbarService } from '../_services/snackbar.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TicketsResolver implements Resolve<Ticket> {
  constructor(
    private ticketService: TicketService,
    private snackbar: SnackbarService,
    private route: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Ticket> {
    return this.ticketService.getTickets().pipe(
      catchError((error) => {
        this.snackbar.Success('Problem retrieving data');
        this.route.navigate(['/dashboard']);
        return of(null);
      })
    );
  }
}
