import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Ticket } from '../_models/Ticket';
import { TicketService } from '../_services/ticket.service';
import { SnackbarService } from '../_services/snackbar.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../_models/Project';
import { ProjectService } from '../_services/project.service';

@Injectable()
export class TicketManagerResolver implements Resolve<Project>{
    constructor(private projectService: ProjectService,
                private snackbar: SnackbarService,
                private router: Router) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> {
        return this.projectService.getProject(route.params.id).pipe(
            catchError( error => {
                this.snackbar.Success('Problem retreving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }
}