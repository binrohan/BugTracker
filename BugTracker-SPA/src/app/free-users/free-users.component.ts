import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { UserRes } from '../_models/UserRes';
import { UserService } from '../_services/user.service';
import { Sort } from '@angular/material/sort';
import { SnackbarService } from '../_services/snackbar.service';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-free-users',
  templateUrl: './free-users.component.html',
  styleUrls: ['./free-users.component.css']
})
export class FreeUsersComponent implements OnInit {

  userRes: UserRes;
  usersId: string[] = [];
  projectId: string;

  @Output() sendId = new EventEmitter<string[]>();
  @Input() projectid;

  displayedColumns: string[] = [
    'Name',
    'Roles',
    'Action',
  ];
  pageSizeOptions: number[] = [5, 9, 15];
  pageIndex = 0;
  pagesize = 5;
  userParams: any = {pageSize: 5, pageIndex: 0, filter: '', orderBy: 'Nameasc', stateBy: 'free'};

  constructor(private route: ActivatedRoute, private userService: UserService, private snackbar: SnackbarService,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.userRes = data.freeRes;
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
    this.userService.getUsers(this.userParams).subscribe(
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

  onSelect( id: string, name: string) {

    if (!this.usersId.includes(id)){
      this.usersId.push(id);
    } else if (this.usersId.includes(id)) {
      const i = this.usersId.indexOf(id);
      this.usersId.splice(i, 1);
    }
  }

  assignUsers() {
    if (this.usersId.length < 1) {
      this.snackbar.Success('Select some your first');
      return false;
    }
    this.projectService.assignUsers( parseInt(this.projectId = this.route.snapshot.paramMap.get('id'), 10),
                                    {userId: this.usersId}).subscribe(() => {
      this.snackbar.Success('Assigned Successfully');
    }, error => {
      this.snackbar.Success('Failed to Assigned');
    }, () => {
      this.loadUsers();
    });
  }
}
