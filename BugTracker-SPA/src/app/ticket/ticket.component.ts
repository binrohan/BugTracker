import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../_models/Ticket';
import { Sort } from '@angular/material/sort';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticketParams: any = {};
  displayedArchivedColumns: string[] = [
    'id',
    'title',
    'projectName',
    'submissionDate',
    'category',
    'Action',
  ];
  tickets: Ticket[];
  archivedTickets: Ticket[];
  constructor(private authService: AuthService, private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.tickets = data.tickets;
    });
    this.ticketParams.isArchived = true;
    this.loadArchivedTickets();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.archivedTickets.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
    this.ticketParams.filter = filterValue;
    // this.loadArchivedTickets();
  }

  sortData(sort: Sort) {
    if (sort.active) {
      this.ticketParams.orderBy = (sort.active + sort.direction);
      this.loadArchivedTickets();
    }
  }
  loadArchivedTickets() {
    this.ticketService.getTickets(this.ticketParams).subscribe(
      (data) => {
        this.archivedTickets = data;
      },
      (error) => {}
    );
  }
}
