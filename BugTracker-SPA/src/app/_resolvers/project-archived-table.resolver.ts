import { Injectable } from '@angular/core';
import { Project } from '../_models/Project';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SnackbarService } from '../_services/snackbar.service';
import { ProjectService } from '../_services/project.service';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../_services/admin.service';
import { ProjectRes } from '../_models/ProjectRes';

@Injectable()
export class ProjectsArchivedTableResolver implements Resolve<ProjectRes>{
    projectParams: any = { pageSize: 9, pageIndex: 0, filter: '' , orderBy: 'Starteddesc', stateBy: 'archived'};
    constructor(private adminService: AdminService, private snackbar: SnackbarService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectRes> {
        return this.adminService.getProjects(this.projectParams).pipe(
            catchError(error => {
                this.snackbar.Success('Problem retrieving your data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }
}