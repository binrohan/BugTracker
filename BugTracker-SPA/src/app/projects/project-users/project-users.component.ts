import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRes } from 'src/app/_models/UserRes';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/_services/user.service';
import { Sort } from '@angular/material/sort';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.css']
})
export class ProjectUsersComponent implements OnInit {

  userRes: UserRes;
  @Input() projectId: number;

  displayedColumns: string[] = [
    'Name',
    'Email',
    'Phone',
    'Roles',
    'Action',
  ];
  pageSizeOptions: number[] = [5, 9, 15];
  pageIndex = 0;
  pagesize = 9;
  userParams: any = {pageSize: 9, pageIndex: 0, filter: '', orderBy: 'Nameasc', stateBy: 'all'};
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private route: ActivatedRoute, private userService: UserService, private snackbar: SnackbarService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.userRes = data.userRes;
      this.projectId = this.userRes.users.pop().projectId;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userParams.filter = filterValue;
    this.loadUsers();
  }

  sortData(sort: Sort) {
    if (sort.active) {
      this.userParams.orderBy = (sort.active + sort.direction);
      console.log(this.userParams.orderBy);
      this.loadUsers();
    }
  }

  loadUsers() {
    this.userService.getProjectUsers(this.projectId, this.userParams).subscribe(
      (data) => {
        this.userRes = data;
      },
      (error) => {
        this.snackbar.Success('Failed to reload');
      }
    );
  }

  paginating(e){
    console.log(e);
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.userParams.pageSize = this.pagesize;
    this.userParams.pageIndex = this.pageIndex;

    this.loadUsers();
  }

}
