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

@Injectable()
export class TicketsResolver implements Resolve<Ticket> {
  ticketParams: any = { pageSize: 9, pageIndex: 0, filter: '' };
  constructor(
    private adminService: AdminService,
    private snackbar: SnackbarService,
    private route: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Ticket> {
    return this.adminService.getTickets(this.ticketParams).pipe(
      catchError((error) => {
        this.snackbar.Success('Problem retrieving data');
        this.route.navigate(['/dashboard']);
        return of(null);
      })
    );
  }
}
