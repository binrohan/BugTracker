import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { TicketService } from '../_services/ticket.service';
import { AssistService } from '../_services/assist.service';
import { ProjectService } from '../_services/project.service';
import { SnackbarService } from '../_services/snackbar.service';
import { Category } from '../_models/Category';
import { Project } from '../_models/Project';
import { Status } from '../_models/Status';
import { Priority } from '../_models/Priority';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { Ticket } from '../_models/Ticket';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css'],
})
export class TicketFormComponent implements OnInit {
  @Input() projectIdFromParent: number;
  @Input() userIdFromParent: number;
  @Output() closeform = new EventEmitter<boolean>();
  ticketForm: FormGroup;

  projects: Project[];
  project: Project;
  categories: Category[];
  statuses: Status;
  priorities: Priority[];
  users: User[] = [];
  ticket: Ticket;


  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private assistService: AssistService,
    private projectService: ProjectService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.createTicketForm();
    this.loadData();
  }
  createTicketForm(projectId?: number, userId?: number) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      submissionDate: ['', Validators.required],
      projectId: ['', Validators.required],
      userId: [],
      categoryId: ['', Validators.required],
      priorityId: ['', Validators.required],
      statusId: ['', Validators.required],
    });
  }
  addTicket() {
    if (this.ticketForm.valid) {
      this.ticket = Object.assign({}, this.ticketForm.value);
      this.ticketService.addTicket(this.ticket).subscribe(() => {
        this.snackbar.Success('New ticket added');
      }, error => {
        this.snackbar.Success('Error in adding ticket');
      });
    }
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
    this.projectService.getProjects(false).subscribe((data) => {
      this.projects = data;
      }, error => {
        this.snackbar.Success('Failed Cate');
    });
}

  getUsersForProject(projectId){
    this.users = [];
    this.projectService.getProject(projectId).subscribe((data) => {
      this.project = data;
      this.project.users.forEach(u => u.roles.includes('Developer') ? this.users.push(u) : false);
    });
  }

  resetOrsendToParent() {
    this.closeform.emit(false);
    this.ticketForm.reset();
  }
}
