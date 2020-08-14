import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../_models/Project';
import { User } from '../../_models/User';
import { Sort } from '@angular/material/sort';
import { UserService } from '../../_services/user.service';
import { Ticket } from 'src/app/_models/Ticket';
import { FreeUsersComponent } from 'src/app/free-users/free-users.component';
import { FreeUsersResolver } from 'src/app/_resolvers/free-users.resolver';
import { ProjectTicketsComponent } from '../project-tickets/project-tickets.component';
import { ProjectBasicComponent } from '../project-basic/project-basic.component';
import { ProjectUsersComponent } from '../project-users/project-users.component';
import { TicketFormComponent } from 'src/app/tickets/ticket-form/ticket-form.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {

  @ViewChild(FreeUsersComponent) assignUser: FreeUsersComponent;
  @ViewChild(ProjectUsersComponent) ProjectUsers: ProjectUsersComponent;
  @ViewChild(ProjectBasicComponent) projectBasic: ProjectBasicComponent;
  // @ViewChild(TicketFormComponent) ticketForm: TicketFormComponent;
  @ViewChild(ProjectTicketsComponent) projectTickets: ProjectTicketsComponent;

  step = 0;
  projectId: number;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.projectId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  addPersonnel(){
    this.step = 2;
  }

  assignUsers() {
    this.assignUser.assignUsers();
  }
  loadFreeUsers(){
    this.assignUser.loadUsers();
  }
  archiveProject(){
    this.projectBasic.archivedProject();
  }
  loadUsers(){
    this.ProjectUsers.loadUsers();
  }
  loadTickets(){
    this.projectTickets.loadTickets();
  }
}
