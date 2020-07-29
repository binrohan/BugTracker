import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Ticket } from '../_models/Ticket';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-ticket-list-archived',
  templateUrl: './ticket-list-archived.component.html',
  styleUrls: ['./ticket-list-archived.component.css']
})
export class TicketListArchivedComponent implements OnInit {

  @Input() ticketRes: any;
  tickets: Ticket[];

  displayedArchivedColumns: string[] = [
    'id',
    'title',
    'projectName',
    'submissionDate',
    'category',
    'Action',
  ];

  pageSizeOptions: number[] = [5, 8, 15];
  pageIndex = 0;
  length: number;
  pagesize = 8;
  previousPageIndex: number;
  ticketParams: any = { pageIndex: this.pageIndex, pageSize: this.pagesize, filter: '', isArchived: true };

  constructor(private authService: AuthService, private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit() {
    // this.route.data.subscribe((data) => {
    //   this.ticketRes = data.ticketRes;
    // });
    this.tickets = this.ticketRes.ticketsForReturn;
    this.length = this.ticketRes.length;
    console.log(this.ticketRes);
    this.loadArchivedTickets();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.ticketParams.filter = filterValue;
    this.loadArchivedTickets();
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
        this.tickets = data.ticketsForReturn;
      },
      (error) => {}
    );
  }

  paginating(e){
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.ticketParams.pageSize = this.pagesize;
    this.ticketParams.pageIndex = this.pageIndex;

    this.loadArchivedTickets();
  }

}
