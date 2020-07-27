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

  @Input() ticketRes: any;
  tickets: Ticket[];

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


  pageSizeOptions: number[] = [5, 9, 15];
  pageIndex = 0;
  length: number;
  pagesize = 9;
  previousPageIndex: number;
  ticketParams: any = { pageIndex: this.pageIndex, pageSize: this.pagesize, filter: '' };



  constructor(private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit() {
    this.tickets = this.ticketRes.ticketsForReturn;
    this.length = this.ticketRes.length;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.users.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
    this.ticketParams.filter = filterValue;
    this.loadTickets();
  }

  sortData(sort: Sort) {
    if (sort.active) {
      this.ticketParams.orderBy = (sort.active + sort.direction);
      console.log(this.ticketParams.orderBy);
      this.loadTickets();
    }
  }
  loadTickets() {
    this.ticketService.getTickets(this.ticketParams).subscribe(
      (data) => {
        this.tickets = data.ticketsForReturn;
        this.length = data.length;
      },
      (error) => {}
    );
  }

  paginating(e){
    console.log(e);
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.ticketParams.pageSize = this.pagesize;
    this.ticketParams.pageIndex = this.pageIndex;

    this.loadTickets();
  }

}
