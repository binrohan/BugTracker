import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../_models/Project';
import { User } from '../../_models/User';
import { Sort } from '@angular/material/sort';
import { UserService } from '../../_services/user.service';
import { Ticket } from 'src/app/_models/Ticket';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {



  step = 0;
  projectId: number;












  project: Project;
  availableUsers: User[];
  newUsersId: any[] = [];



  userParams: any = {pageSize: 9, pageIndex: 0, filter: '', orderBy: 'Nameasc', stateBy: 'free'};


  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.project = data.project;
    });
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



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setProjectId(e) {
    this.projectId = e;
    console.log(this.projectId);
  }
}
