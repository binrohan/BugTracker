import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../_services/snackbar.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { AuthService } from '../_services/auth.service';
import { UserRes } from '../_models/UserRes';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-UserManagement',
  templateUrl: './UserManagement.component.html',
  styleUrls: ['./UserManagement.component.css'],
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'Name',
    'Email',
    'Phone',
    'Roles',
    'Action',
  ];
  i = 0;
  pageSizeOptions: number[] = [5, 9, 15];
  pageIndex = 0;
  pagesize = 10;
  userParams: any = {pageSize: this.pagesize, pageIndex: 0, filter: '', orderBy: 'Nameasc', stateBy: 'all'};

  userRes: UserRes;
  step = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private snackbar: SnackbarService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userParams.filter = filterValue;
    this.loadUsers();
  }

  sortData(sort: Sort) {
    if (sort.active) {
      this.userParams.orderBy = (sort.active + sort.direction);
      this.loadUsers();
    }
  }

  loadUsers() {
    this.userService.getUsers(this.userParams).subscribe(
      (data) => {
        this.userRes = data;
      },
      (error) => {
        this.snackbar.Success('Failed to reload data');
      }
    );
  }

  paginating(e){
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.userParams.pageSize = this.pagesize;
    this.userParams.pageIndex = this.pageIndex;

    this.loadUsers();
  }
  setStep(index: number) {
    this.step = index;
  }
}
