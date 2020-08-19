import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/_services/ticket.service';
import { AuthService } from 'src/app/_services/auth.service';
import { TicketRes } from 'src/app/_models/TicketRes';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-ticket-list-passed-user',
  templateUrl: './ticket-list-passed-user.component.html',
  styleUrls: ['./ticket-list-passed-user.component.css']
})
export class TicketListPassedUserComponent implements OnInit {

  ticketParams: any = { pageSize: 5, pageIndex: 0, filter: '' , stateBy: 'passed'};

  ticketRes: TicketRes;
  userId: string;

  displayedColumns: string[] = [
    'title',
    'category',
    'priority',
    'status',
    'Action',
  ];
  pageSizeOptions: number[] = [5, 10, 15];
  pageIndex = 0;
  length: number;
  pagesize = 5;

  constructor(private ticketService: TicketService,
              private authservice: AuthService,
              private snackbar: SnackbarService) { }

  ngOnInit() {
    this.userId = this.authservice.decodedToken.nameid;

    this.loadData();
  }

  loadData(){
    this.ticketService.getUserTickets(this.userId, this.ticketParams).subscribe(data => {
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
