import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRes } from 'src/app/_models/UserRes';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/_services/user.service';
import { Sort } from '@angular/material/sort';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.css']
})
export class ProjectUsersComponent implements OnInit {

  userRes: UserRes;
  projectId: number;

  displayedColumns: string[] = [
    'Name',
    'Email',
    'Phone',
    'Roles',
    'Action',
  ];
  pageSizeOptions: number[] = [5, 9, 15];
  pageIndex = 0;
  pagesize = 5;
  userParams: any = {pageSize: 5, pageIndex: 0, filter: '', orderBy: 'Nameasc', stateBy: 'all'};
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private route: ActivatedRoute, private userService: UserService, private snackbar: SnackbarService,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.userRes = data.userRes;
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
      this.loadUsers();
    }
  }

  loadUsers() {
    this.userService.getProjectUsers(parseInt(this.route.snapshot.paramMap.get('id'), 10), this.userParams).subscribe(
      (data) => {
        this.userRes = data;
      },
      (error) => {
        this.snackbar.Success('Failed to reload');
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

  onRemove(userId: number) {
    this.projectService.assignUsers(parseInt(this.route.snapshot.paramMap.get('id'), 10), { userId: [userId] }).subscribe(() => {
      this.snackbar.Success('User Removed');
    }, error => {
      this.snackbar.Success('Failed to Reload User');
    }, () => {
      this.loadUsers();
    });
    this.loadUsers();
  }

}
