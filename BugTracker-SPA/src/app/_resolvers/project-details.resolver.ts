import { Injectable } from '@angular/core';
import { Project } from '../_models/Project';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProjectService } from '../_services/project.service';
import { SnackbarService } from '../_services/snackbar.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProjectDetailsResolver implements Resolve<Project>{

    constructor(private projectService: ProjectService,
                private snackbar: SnackbarService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> {
        return this.projectService.getProject(route.params.id).pipe(
            catchError(error => {
                this.snackbar.Success('Problem retrieving your data: Project Details');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }

}
