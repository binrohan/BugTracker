import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../_models/Ticket';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  @Input() tickets;
  ticketParams: any = {};
  displayedColumns: string[] = [
    'id',
    'title',
    'projectName',
    'updated',
    'submissionDate',
    'category',
    'priority',
    'status',
    'Action',
  ];

  constructor(private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit() {
    // this.route.data.subscribe((data) => {
    //   this.tickets = data.tickets;
    // });
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.users.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    if (sort.active) {
      this.ticketParams.orderBy = (sort.active + sort.direction);
      console.log(this.ticketParams.orderBy);
      this.loadUsers();
    }
  }
  loadUsers() {
    this.ticketService.getTickets(this.ticketParams).subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => {}
    );
  }

}
