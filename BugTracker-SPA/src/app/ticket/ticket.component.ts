import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../_models/Ticket';
import { Sort } from '@angular/material/sort';
import { TicketService } from '../_services/ticket.service';
import { TicketRes } from '../_models/TicketRes';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticketRes: any;
  archivedTicketRes: TicketRes;
  archivedTicketParams: any = {isArchived: false, pageIndex: 0, pageSize: 8, orderBy: 'idasc', filter: ''};

  constructor(private authService: AuthService, private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.ticketRes = data.ticketRes;
    });
    this.loadArchivedTickets();
  }

  loadArchivedTickets() {
    this.ticketService.getTickets(this.archivedTicketParams).subscribe(
      (data) => {
        this.archivedTicketRes = data;
      },
      (error) => {}
    );
  }
}
