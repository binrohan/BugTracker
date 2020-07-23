import { Injectable } from '@angular/core';
import { Project } from '../_models/Project';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SnackbarService } from '../_services/snackbar.service';
import { ProjectService } from '../_services/project.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProjectsResolver implements Resolve<Project>{

    constructor(private projectService: ProjectService, private snackbar: SnackbarService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> {
        return this.projectService.getProjects(false).pipe(
            catchError(error => {
                this.snackbar.Success('Problem retrieving your data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }
}
