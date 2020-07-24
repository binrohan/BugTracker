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
  users: User[];
  assignedUsers: any[];
  newUsers: string[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.project = data.project;
    });
    this.assignedUsers = this.project.users;
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log('error');
      }
    );
  }

  onSelect( el) {
    console.log(el);
    this.newUsers.push(el);
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
