import { Component, OnInit } from '@angular/core';
import { UserRes } from '../_models/UserRes';
import { UserService } from '../_services/user.service';
import { SnackbarService } from '../_services/snackbar.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.css'],
})
export class NewUsersComponent implements OnInit {
  userRes: UserRes;

  displayedColumns: string[] = ['Name', 'Email', 'Registerdate', 'Action'];
  pageSizeOptions: number[] = [5, 9, 15];
  pageIndex = 0;
  pagesize = 5;
  userParams: any = {
    pageSize: 5,
    pageIndex: 0,
    filter: '',
    orderBy: 'Registerdatedesc',
    stateBy: 'new',
  };

  constructor(
    private userService: UserService,
    private snackbar: SnackbarService
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
      this.userParams.orderBy = sort.active + sort.direction;
      this.loadUsers();
    }
  }

  loadUsers() {
    this.userService.getUsers(this.userParams).subscribe(
      (data) => {
        this.userRes = data;
      },
      (error) => {
        this.snackbar.Success('Failed to reload');
      }
    );
  }

  paginating(e) {
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.userParams.pageSize = this.pagesize;
    this.userParams.pageIndex = this.pageIndex;

    this.loadUsers();
  }
}
