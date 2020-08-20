import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Ticket } from '../../_models/Ticket';
import { AuthService } from '../../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../_services/ticket.service';
import { AdminService } from 'src/app/_services/admin.service';
import { TicketRes } from 'src/app/_models/TicketRes';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-ticket-list-archived',
  templateUrl: './ticket-list-archived.component.html',
  styleUrls: ['./ticket-list-archived.component.css']
})
export class TicketListArchivedComponent implements OnInit {

  ticketRes: TicketRes;


  displayedArchivedColumns: string[] = [
    'id',
    'title',
    'projectName',
    'submissionDate',
    'category',
    'Action',
  ];

  pageSizeOptions: number[] = [5, 10, 15];
  pageIndex = 0;
  pagesize = 10;
  previousPageIndex: number;
  ticketParams: any = { pageIndex: this.pageIndex, pageSize: this.pagesize, filter: '', stateBy: 'archived' };

  constructor(private snackbar: SnackbarService,
              private ticketService: TicketService
              ) { }

  ngOnInit() {
    this.loadArchivedTickets();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
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
        this.ticketRes = data;
      },
      (error) => {
        this.snackbar.Success('Failed to load Archived Tickets');
      }
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
