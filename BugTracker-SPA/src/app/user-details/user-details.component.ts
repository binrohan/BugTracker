import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { AdminService } from '../_services/admin.service';
import { SnackbarService } from '../_services/snackbar.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormControlName } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/Project';
import { UserService } from '../_services/user.service';

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
  projects: Project[];
  userId: string[] = [];
  showList = false;
  displayedColumns: string[] = [
    'No.',
    'Title',
    'Category',
    'Status',
    'Priority',
    'Passed',
    'Mgr Approved',
    'Submission'
  ];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private snackbar: SnackbarService,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
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
    this.projectService.getProjects(false).subscribe((data) => {
      this.projects = data;
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
  applyFilter($event){

  }
  sortData($event){

  }
}
