import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../_models/User';
import { AdminService } from '../_services/admin.service';
import { SnackbarService } from '../_services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControlName } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/Project';
import { UserService } from '../_services/user.service';
import { TicketService } from '../_services/ticket.service';
import { Ticket } from '../_models/Ticket';
import { ProjectRes } from '../_models/ProjectRes';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User;
  roles: any[];
  allRoles = ['Admin', 'Manager', 'Developer'];
  isRoleChanged = false;
  isFree: boolean;
  userRoles: any[];
  projectRes: ProjectRes;

  userId: string[] = [];
  showList = false;
  showTicketForm = false;

  displayedProjectColumns: string[] = [
    'Title',
    'Started',
    'Tickets',
    'Action'
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 9, 15];
  pageIndex = 0;
  pagesize = 5;
  projectParams: any = { pageSize: this.pagesize, pageIndex: this.pageIndex, filter: '' , orderBy: 'Starteddesc', stateBy: 'active'};

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private snackbar: SnackbarService,
    private projectService: ProjectService,
    private userService: UserService,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
    this.route.data.subscribe((data) => {
      this.projectRes = data.projectRes;
    });
    this.roles = this.user.roles;
    if (this.user.project != null){
      this.isFree = false;
    } else {
      this.isFree = true;
    }
    this.userId.push(this.user.id);
  }

  onSelect(e, value) {
    this.isRoleChanged = true;
    if (e.target.checked) {
      if (!this.roles.includes(value.value)) {
        this.roles.push(value.value);
      }
    } else if (!e.target.checked) {
      const index = this.roles.indexOf(value.value);
      this.roles.splice(index, 1);
    }
  }

  updateUserRole() {
    this.isRoleChanged = false;
    const newRoleSet = { roleNames: this.roles };
    this.adminService.updateUserRole(this.user.id, newRoleSet).subscribe(() => {
      this.snackbar.Success('User roles Updated');
    }, err => {
      this.snackbar.Success('Error during update');
    });
  }

  getProjects() {
    this.adminService.getProjects(this.projectParams).subscribe((data) => {
      this.projectRes = data;console.log(this.projectRes);
    });
    this.showList = true;
  }

  assignProject(id: number){
    const newUser = { userId: this.userId};
    this.projectService.assignUsers(id, newUser).subscribe(() => {
      this.snackbar.Success('User Assigned To Project');
      this.userService.getUser(this.user.id).subscribe(data => {
        this.user = data;
      });
      this.isFree = false;
      this.showList = false;
    }, error => {
      this.snackbar.Success('Failed to Assigned');
    });
  }

  removeProject(id: number){
    const newUser = { userId: this.userId};
    if (this.user.tickets.length > 0){
      this.snackbar.Success('User has some tickets to resolve');
      return false;
    }
    this.projectService.assignUsers(id, newUser).subscribe(() => {
      this.snackbar.Success('User Removed To Project');
      this.userService.getUser(this.user.id).subscribe(data => {
        this.user = data;
      });
      this.isFree = true;
    }, error => {
      this.snackbar.Success('Failed to Remove');
    });
  }

  closeProjectList(){
    this.showList = false;
  }

  deleteUser(){
    if (this.user.tickets.length > 0){
      this.snackbar.Success('Unassign user from ticket');
      return false;
    }
    if (this.user.project != null){
      this.snackbar.Success('Unassign user from project');
      return false;
    }
    if (confirm('Are you sure?')) {
      this.adminService.removeUser(this.user.id).subscribe(() => {
        this.snackbar.Success('User Removed');
        this.router.navigate(['users']);
      }, error => {
        this.snackbar.Success('Problem during remove user');
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.users.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
    this.projectParams.filter = filterValue;
    this.getProjects();
  }

  sortData(sort: Sort) {
    if (sort.active) {
      this.projectParams.orderBy = (sort.active + sort.direction);
      console.log(this.projectParams.orderBy);
      this.getProjects();
    }
  }

  paginating(e){
    console.log(e);
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.projectParams.pageSize = this.pagesize;
    this.projectParams.pageIndex = this.pageIndex;

    this.getProjects();
  }
}
