import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../../_models/Ticket';
import { TicketService } from '../../_services/ticket.service';
import { TicketRes } from '../../_models/TicketRes';
import { AdminService } from 'src/app/_services/admin.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  ticketRes: TicketRes;


  displayedColumns: string[] = [
    'title',
    'projectName',
    'user',
    'category',
    'priority',
    'status',
    'Action',
  ];


  pageSizeOptions: number[] = [5, 10, 15];
  pageIndex = 0;
  length: number;
  pagesize = 10;
  ticketParams: any = { pageIndex: this.pageIndex, pageSize: this.pagesize, filter: '', stateBy: 'active'};



  constructor(private ticketService: TicketService,
              private route: ActivatedRoute,
              private adminService: AdminService, private snackbar: SnackbarService) { }

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
      this.ticketParams.orderBy = (sort.active + sort.direction);
      this.loadTickets();
    }
  }
  loadTickets() {
    this.ticketService.getTickets(this.ticketParams).subscribe(
      (data) => {
        this.ticketRes = data;
      },
      (error) => {
        this.snackbar.Success('Failed to load data');
      }
    );
  }

  paginating(e){
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.ticketParams.pageSize = this.pagesize;
    this.ticketParams.pageIndex = this.pageIndex;

    this.loadTickets();
  }

}
