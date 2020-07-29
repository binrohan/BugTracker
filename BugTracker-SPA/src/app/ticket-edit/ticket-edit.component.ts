import { Component, OnInit } from '@angular/core';
import { Ticket } from '../_models/Ticket';
import { TicketService } from '../_services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_models/User';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/Project';
import { AssistService } from '../_services/assist.service';
import { Category } from '../_models/Category';
import { Status } from '../_models/Status';
import { Priority } from '../_models/Priority';
import { SnackbarService } from '../_services/snackbar.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {

  ticket: Ticket;
  updatedTicket: Ticket;
  ticketEditForm: FormGroup;
  users: User[];
  project: Project;
  categories: Category[];
  statuses: Status;
  priorities: Priority[];

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private fb: FormBuilder,
              private projectService: ProjectService,
              private assistService: AssistService,
              private snackbar: SnackbarService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.ticket = data.ticket;
    });
    console.log(this.ticket);
    this.createEditTicketForm();
    this.loadData();
    this.getUsersForProject(this.ticket.project.id);
  }

  createEditTicketForm(projectId?: number, userId?: number) {
    this.ticketEditForm = this.fb.group({
      title: [this.ticket.title, Validators.required],
      description: [this.ticket.description, Validators.required],
      submissionDate: [this.ticket.submissionDate, Validators.required],
      userId: [this.ticket.user?.id],
      categoryId: [this.ticket.category?.id, Validators.required],
      priorityId: [this.ticket.priority?.id, Validators.required],
      statusId: [this.ticket.status?.id, Validators.required],
    });
  }

  updateTicket(){
    if (this.ticketEditForm.valid) {
      this.updatedTicket = Object.assign({}, this.ticketEditForm.value);
      this.ticketService.updateTicket(this.ticket.id, this.updatedTicket).subscribe(() => {
        this.ticketService.getTicket(this.ticket.id).subscribe(data => {
          this.ticket = data;
        });
        this.snackbar.Success('Ticket Updated');
      }, err => {
        this.snackbar.Success('Error during update');
      });
    }
  }

  getUsersForProject(projectId){
    this.users = [];
    this.projectService.getProject(projectId).subscribe((data) => {
      this.project = data;
      this.project.users.forEach(u => u.roles.includes('Developer') ? this.users.push(u) : false);
    });
  }

  loadData() {
    this.assistService.getCate().subscribe((data) => {
      this.categories = data;
    }, error => {
      this.snackbar.Success('Failed Cate');
    });
    this.assistService.getPri().subscribe((data) => {
    this.priorities = data;
    }, error => {
      this.snackbar.Success('Failed Cate');
  });
    this.assistService.getSta().subscribe((data) => {
    this.statuses = data;
    }, error => {
      this.snackbar.Success('Failed Cate');
  });
}

}
