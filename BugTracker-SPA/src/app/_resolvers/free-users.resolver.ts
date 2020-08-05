import { UserRes } from '../_models/UserRes';
import { UserService } from '../_services/user.service';
import { SnackbarService } from '../_services/snackbar.service';
import { Router, ActivatedRoute, RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class FreeUsersResolver implements Resolve<UserRes> {
    userParams: any = {pageSize: 5, pageIndex: 0, filter: '', orderBy: 'Nameasc', stateBy: 'free'};
    constructor(private userService: UserService,
                private snackbar: SnackbarService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserRes> {
        return this.userService.getUsers(this.userParams).pipe(
            catchError((error) => {
                this.snackbar.Success('Problem retriving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }
}
