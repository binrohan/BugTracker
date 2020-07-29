import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../_models/Ticket';
import { CommentService } from '../_services/comment.service';
import { CommentRes } from '../_models/CommentRes';
import { SnackbarService } from '../_services/snackbar.service';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  ticket: Ticket;
  comments: Comment[];
  length: number;
  isDeveloperPassed: boolean;


  constructor(private route: ActivatedRoute, private commentService: CommentService, private snackbar: SnackbarService, private ticketService: TicketService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.ticket = data.ticket;
    });
    this.loadComments();
    this.isDeveloperPassed = this.ticket.isDeveloperPassed;
  }

  loadComments(){
    this.commentService.getComments(this.ticket.id, {pageSize: 5, pageIndex: 0, orderBy: 'createdasc', filter: '' }).subscribe(data => {
      this.comments = data.comments;
    }, error => {
      this.snackbar.Success('Error');
    });
  }
  passTicket(){
    const ticket =  this.ticket;
    ticket.isDeveloperPassed = true;

    this.ticketService.updateTicket(this.ticket.id, ticket).subscribe(() => {
      this.snackbar.Success('Ticket Passed to manager');
      this.isDeveloperPassed = this.ticket.isDeveloperPassed;
    }, error => {
      this.snackbar.Success('Failed to pass');
    });
  }

  approveTicket(){
    if (this.ticket.isDeveloperPassed) {
      const ticket =  this.ticket;
      ticket.isManagerPassed = true;

      this.ticketService.updateTicket(this.ticket.id, ticket).subscribe(() => {
        this.snackbar.Success('Ticket Passed to admin');
      }, error => {
        this.snackbar.Success('Failed to pass');
      });
    }
  }

  archiveTicket(){
    const ticket =  this.ticket;
    ticket.isArchived = true;

    this.ticketService.updateTicket(this.ticket.id, ticket).subscribe(() => {
      this.snackbar.Success('Ticket Archived');
    }, error => {
      this.snackbar.Success('Failed to Archived');
    });
  }

  reload(){
    this.ticketService.getTicket(this.ticket.id).subscribe((data) => {
      this.ticket = data;
    }, error => {
      this.snackbar.Success('failed to reload');
    });
  }
}
