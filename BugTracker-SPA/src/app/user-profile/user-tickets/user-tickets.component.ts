import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TicketService } from 'src/app/_services/ticket.service';
import { TicketRes } from 'src/app/_models/TicketRes';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css']
})
export class UserTicketsComponent implements OnInit {

  @Input() userId: string;
  @Output() length = new EventEmitter<number>();

  displayedColumns: string[] = [
    'title',
    'updated',
    'submissionDate',
    'category',
    'priority',
    'status',
    'Action',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 9, 15];
  pageIndex = 0;
  pagesize = 9;
  ticketParams: any = { pageIndex: this.pageIndex, pageSize: this.pagesize, filter: '' };

  ticketRes: TicketRes;

  constructor(private ticketService: TicketService,
              private snackbar: SnackbarService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.ticketRes = data.ticketRes;
    });
    this.loadTickets();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketParams.filter = filterValue;
    this.loadTickets();
  }

  sortData(sort: Sort) {
    if (sort.active) {
      this.ticketParams.orderBy = (sort.active + sort.direction);
      this.loadTickets();
    }
  }
  loadTickets() {
    this.ticketService.getUserTickets(this.userId, this.ticketParams).subscribe(
      data => {
        this.ticketRes = data;
      },
      (error) => {

      }, () => {
        this.length.emit(this.ticketRes.length);
      });
  }

  paginating(e){
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.ticketParams.pageSize = this.pagesize;
    this.ticketParams.pageIndex = this.pageIndex;

    this.loadTickets();
  }

  unassignTicket(id: number){
    const sure = confirm('You are about to unassign user form ticket\n Are you sure?');
    if (sure){
      this.ticketService.assignTicket(id, {userId: null}).subscribe(() => {
        this.snackbar.Success('Ticket unassigned from user');
        this.loadTickets();
      }, error => {
        this.snackbar.Success('Ticket unssigning failed');
      });
    }
  }
}
