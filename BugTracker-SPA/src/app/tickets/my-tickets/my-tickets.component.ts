import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { AuthService } from 'src/app/_services/auth.service';
import { TicketService } from 'src/app/_services/ticket.service';
import { TicketRes } from 'src/app/_models/TicketRes';
import { Ticket } from 'src/app/_models/Ticket';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {

  activeTickets: TicketRes;
  resolvedTickets: TicketRes;
  devPassedTickets: TicketRes;
  managerPassedTickets: TicketRes;
  userId: string;


  displayedColumns: string[] = [
    'title',
    'projectName',
    'updated',
    'category',
    'priority',
    'status',
    'Action',
  ];
  pageSizeOptions: number[] = [5, 10, 15];
  pageIndex = 0;
  pagesize = 10;
  ticketParams: any = { pageIndex: this.pageIndex, pageSize: this.pagesize, filter: '', stateBy: 'all'};

  constructor(private snackbar: SnackbarService,
              private authService: AuthService,
              private ticketService: TicketService) { }

  ngOnInit() {
    this.userId = this.authService.currentUser.id;
  }

  loadTickets(){

  }

}
