import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { SnackbarService } from '../_services/snackbar.service';
import { AuthService } from '../_services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UsersResolver implements Resolve<User>{

    constructor(private userService: UserService,
                private snackbar: SnackbarService,
                private router: Router,
                private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.userService.getUsers().pipe(
            catchError(error => {
                this.snackbar.Success('Problem retrieving your data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }
}
