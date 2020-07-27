import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Ticket } from '../_models/Ticket';
import { TicketService } from '../_services/ticket.service';
import { SnackbarService } from '../_services/snackbar.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TicketDetailsResolver implements Resolve<Ticket>{
    constructor(private ticketService: TicketService,
                private snackbar: SnackbarService,
                private router: Router) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ticket> {
        return this.ticketService.getTicket(route.params.id).pipe(
            catchError( error => {
                this.snackbar.Success('Problem retreving data');
                this.router.navigate(['/tickets']);
                return of(null);
            })
        );
    }
}
