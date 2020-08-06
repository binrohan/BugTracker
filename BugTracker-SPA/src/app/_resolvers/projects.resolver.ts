import { Injectable } from '@angular/core';
import { Project } from '../_models/Project';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SnackbarService } from '../_services/snackbar.service';
import { ProjectService } from '../_services/project.service';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../_services/admin.service';

@Injectable()
export class ProjectsResolver implements Resolve<Project>{
    projectParams: any = { pageSize: 10, pageIndex: 0, filter: '' , orderBy: 'Starteddesc', stateBy: 'active'};
    constructor(private adminService: AdminService, private snackbar: SnackbarService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> {
        return this.adminService.getProjects(this.projectParams).pipe(
            catchError(error => {
                this.snackbar.Success('Problem retrieving your data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }
}
