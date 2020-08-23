import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { TicketService } from '../../_services/ticket.service';
import { AssistService } from '../../_services/assist.service';
import { ProjectService } from '../../_services/project.service';
import { SnackbarService } from '../../_services/snackbar.service';
import { Category } from '../../_models/Category';
import { Project } from '../../_models/Project';
import { Status } from '../../_models/Status';
import { Priority } from '../../_models/Priority';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { Ticket } from '../../_models/Ticket';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css'],
})
export class TicketFormComponent implements OnInit {
  @Input() projectIdFromParent: number;
  projectTitle: string;

  ticketForm: FormGroup;

  projects: Project[];
  project: Project;
  categories: Category[];
  statuses: Status[];
  priorities: Priority[];
  users: User[] = [];
  ticket: Ticket;
  projectSubDate: Date = new Date();
  today: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private assistService: AssistService,
    private projectService: ProjectService,
    private snackbar: SnackbarService,
    private adminService: AdminService
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
      projectId: [
        this.projectIdFromParent ? this.projectIdFromParent : '',
        Validators.required,
      ],
      userId: [],
      categoryId: ['', Validators.required],
      priorityId: ['', Validators.required],
      statusId: ['', Validators.required],
    });
  }
  addTicket() {
    if (this.ticketForm.valid) {
      this.ticket = Object.assign({}, this.ticketForm.value);
      // if (this.projectIdFromParent != null) {
      //   this.ticket.projectId = this.projectIdFromParent;
      // }
      this.ticketService.addTicket(this.ticket).subscribe(
        () => {
          this.snackbar.Success('New ticket added');
          this.ticketForm.reset();
        },
        (error) => {
          this.snackbar.Success('Error in adding ticket');
        }
      );
    }
  }
  loadData() {
    this.assistService.getCate().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        this.snackbar.Success('Failed Cate');
      }
    );
    this.assistService.getPri().subscribe(
      (data) => {
        this.priorities = data;
      },
      (error) => {
        this.snackbar.Success('Failed Cate');
      }
    );
    this.assistService.getSta().subscribe(
      (data) => {
        this.statuses = data;
      },
      (error) => {
        this.snackbar.Success('Failed Cate');
      }
    );
    if (this.projectIdFromParent != null) {
      this.projectService.getProject(this.projectIdFromParent).subscribe(
        (data) => {
          this.projectTitle = data.title;
        },
        (error) => {
          this.snackbar.Success('Failed Cate');
        },
        () => {
          this.getUsersForProject(this.projectIdFromParent);
        }
      );
    } else {
      this.adminService
      .getProjects({
        pageIndex: 0,
        filter: '',
        orderBy: 'Starteddesc',
        stateBy: 'active',
      })
      .subscribe(
        (data) => {
          this.projects = data.projects;
        },
        (error) => {
          this.snackbar.Success('Failed Cate');
        }
      );
    }
  }

  getUsersForProject(projectId) {
    this.users = [];
    this.projectService.getProject(projectId).subscribe((data) => {
      this.project = data;
      this.project.users.forEach((u) =>
        u.roles.includes('Developer') ? this.users.push(u) : false
      );
      this.projectSubDate = this.project.deadTime;
    });
  }

  resetOrsendToParent() {
    this.ticketForm.reset();
  }
}
