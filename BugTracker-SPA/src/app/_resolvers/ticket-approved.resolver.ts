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
import { AdminService } from '../_services/admin.service';
import { TicketRes } from '../_models/TicketRes';

@Injectable()
export class TicketsApprovedResolver implements Resolve<TicketRes> {
  ticketParams: any = { pageSize: 5, pageIndex: 0, filter: '', stateBy: 'approved' };
  constructor(
    private ticketService: TicketService,
    private snackbar: SnackbarService,
    private route: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TicketRes> {
    return this.ticketService.getTickets(this.ticketParams).pipe(
      catchError((error) => {
        this.snackbar.Success('Problem retrieving data');
        this.route.navigate(['/dashboard']);
        return of(null);
      })
    );
  }
}
