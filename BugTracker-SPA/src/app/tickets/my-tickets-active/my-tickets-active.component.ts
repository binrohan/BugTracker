import { Component, OnInit, Input } from '@angular/core';
import { TicketRes } from 'src/app/_models/TicketRes';
import { TicketService } from 'src/app/_services/ticket.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-my-tickets-active',
  templateUrl: './my-tickets-active.component.html',
  styleUrls: ['./my-tickets-active.component.css'],
})
export class MyTicketsActiveComponent implements OnInit {
  @Input() userId: string;

  ticketRes: TicketRes;

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
  ticketParams: any = {
    pageIndex: this.pageIndex,
    pageSize: this.pagesize,
    filter: '',
    stateBy: 'live',
  };

  constructor(
    private ticketService: TicketService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.loadTickets();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketParams.filter = filterValue;
    this.loadTickets();
  }

  sortData(sort: Sort) {
    if (sort.active) {
      this.ticketParams.orderBy = sort.active + sort.direction;
      this.loadTickets();
    }
  }
  loadTickets() {
    this.ticketService.getUserTickets(this.userId, this.ticketParams).subscribe(
      (data) => {
        this.ticketRes = data;
      },
      (error) => {
        this.snackbar.Success('Failed to load data');
      }
    );
  }

  paginating(e) {
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.ticketParams.pageSize = this.pagesize;
    this.ticketParams.pageIndex = this.pageIndex;

    this.loadTickets();
  }
}
