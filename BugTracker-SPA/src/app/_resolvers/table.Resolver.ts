import { DataSource } from '@angular/cdk/table';
import { User } from '../_models/User';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';

export class UserDataSource implements DataSource<User> {
  private users = new BehaviorSubject<User[]>([]);
  private loadingUsers = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingUsers.asObservable();

  constructor(private userService: UserService) {}

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.users.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.users.complete();
    this.loadingUsers.complete();
  }

  loadUsers(
    courseId: string,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingUsers.next(true);

    this.userService
      .getUsers()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingUsers.next(false))
      )
      .subscribe((lessons) => this.users.next(lessons));
  }
}
