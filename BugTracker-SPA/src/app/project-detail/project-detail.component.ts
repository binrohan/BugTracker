import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../_models/Project';
import { User } from '../_models/User';
import { Sort } from '@angular/material/sort';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'Name', 'Roles', 'Action'];
  project: Project;
  i = 0;
  assignedUsers: any[];
  availableUsers: User[];
  newUsersId: any[] = [];
  managerId: string;


  userParams: any = {pageSize: 9, pageIndex: 0, filter: '', orderBy: 'Nameasc', stateBy: 'free'};


  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.project = data.project;
    });
    this.assignedUsers = this.project.users;
    this.userParams.stateBy = 'free';
    this.userParams.orderBy = 'Nameasc';
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.userParams).subscribe(
      (data) => {
        this.availableUsers = data.users;
      },
      (error) => {
        console.log('error');
      }
    );
  }

  onSelect( el, id: string) {
    if (!this.newUsersId.includes(id)){
      this.newUsersId.push(id);
    } else if (this.newUsersId.includes(id)) {
      const i = this.newUsersId.indexOf(id);
      this.newUsersId.splice(i, 1);
    }
  }

  onRemove(e, username: string) {}












  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.users.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    // const data = this.desserts.slice();
    // if (!sort.active || sort.direction === '') {
    //   this.sortedData = data;
    //   return;
    // }
  }
}
