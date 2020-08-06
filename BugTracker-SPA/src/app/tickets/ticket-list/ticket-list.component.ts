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
  ticketParams: any = { pageIndex: this.pageIndex, pageSize: this.pagesize, filter: '', stateBy: 'active'};



  constructor(private ticketService: TicketService,
              private route: ActivatedRoute,
              private adminService: AdminService, private snackbar: SnackbarService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.ticketRes = data.ticketRes;console.log(this.ticketRes);
    }, error => {
      this.snackbar.Success('Failed to load data');
    });
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
    this.adminService.getTickets(this.ticketParams).subscribe(
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
