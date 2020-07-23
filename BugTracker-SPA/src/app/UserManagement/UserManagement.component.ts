import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../_services/snackbar.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';
import { MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { AuthService } from '../_services/auth.service';
import { UserDataSource } from '../_resolvers/table.Resolver';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatInput } from '@angular/material/input';
import { fromEvent, merge } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-UserManagement',
  templateUrl: './UserManagement.component.html',
  styleUrls: ['./UserManagement.component.css'],
})
export class UserManagementComponent implements OnInit, AfterViewInit {
  dataSource: UserDataSource;
  displayedColumns: string[] = [
    'No.',
    'Name',
    'Email',
    'Phone',
    'Roles',
    'Action',
  ];
  i = 0;
  users: User;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatInput, {static: true}) input: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private snackbar: SnackbarService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.users = data.users;
    });
    this.dataSource = new UserDataSource(this.userService);
    this.dataSource.loadUsers(this.users.userName, '', 'asc', 0, 3);
  }

  ngAfterViewInit() {

    // server-side search
    fromEvent(this.input.nativeElement,'keyup')
        .pipe(
            debounceTime(150),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadUsersPage();
            })
        )
        .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadUsersPage())
    )
    .subscribe();
}

loadUsersPage() {
  this.dataSource.loadUsers(
      this.users.userName,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
}

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    // const data = this.users.slice();
    // if (!sort.active || sort.direction === '') {
    //   this.sortedData = data;
    //   return;
    // }
  }

  // this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'name': return compare(a.name, b.name, isAsc);
  //       case 'calories': return compare(a.calories, b.calories, isAsc);
  //       case 'fat': return compare(a.fat, b.fat, isAsc);
  //       case 'carbs': return compare(a.carbs, b.carbs, isAsc);
  //       case 'protein': return compare(a.protein, b.protein, isAsc);
  //       default: return 0;
  //     }
  //   });

  // function compare(a: number | string, b: number | string, isAsc: boolean) {
  //     return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  //   }
}
