import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/_services/ticket.service';
import { Sort } from '@angular/material/sort';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-ticket-list-approved',
  templateUrl: './ticket-list-approved.component.html',
  styleUrls: ['./ticket-list-approved.component.css']
})
export class TicketListApprovedComponent implements OnInit {

  ticketRes: any;

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
  pagesize = 5;
  ticketParams: any = { pageIndex: this.pageIndex, pageSize: this.pagesize, filter: '', stateBy: 'approved'};

  constructor(private snackbar: SnackbarService,
              private route: ActivatedRoute,
              private adminService: AdminService) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.ticketRes = data.ticketRes;
    }, error => {
      this.snackbar.Success('Failed to load table data');
    });
  }

  loadData(){
    this.adminService.getTickets(this.ticketParams).subscribe(data => {
      this.ticketRes = data;
    }, error => {
      this.snackbar.Success('Connection Error');
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketParams.filter = filterValue;
    this.loadData();
  }

  sortData(sort: Sort) {
    if (sort.active) {
      this.ticketParams.orderBy = (sort.active + sort.direction);
      this.loadData();
    }
  }

  paginating(e){
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.ticketParams.pageSize = this.pagesize;
    this.ticketParams.pageIndex = this.pageIndex;

    this.loadData();
  }

}
