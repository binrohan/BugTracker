import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Ticket } from '../_models/Ticket';
import { TicketService } from '../_services/ticket.service';
import { SnackbarService } from '../_services/snackbar.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TicketRes } from '../_models/TicketRes';

@Injectable()
export class ProjectTicketsResolver implements Resolve<TicketRes>{
    ticketParams: any = { pageSize: 9, pageIndex: 0, stateBy: 'active', filter: '', orderBy: 'iddesc'};
    constructor(private ticketService: TicketService,
                private snackbar: SnackbarService,
                private router: Router) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TicketRes> {
        return this.ticketService.getProjectTickets(route.params.id, this.ticketParams).pipe(
            catchError( error => {
                this.snackbar.Success('Problem retreving data');
                this.router.navigate(['/projects']);
                return of(null);
            })
        );
    }
}
