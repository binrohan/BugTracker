import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { ActivatedRoute } from '@angular/router';
import { TicketRes } from 'src/app/_models/TicketRes';
import { TicketService } from 'src/app/_services/ticket.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-ticket-list-passed',
  templateUrl: './ticket-list-passed.component.html',
  styleUrls: ['./ticket-list-passed.component.css']
})
export class TicketListPassedComponent implements OnInit {

  ticketRes: TicketRes;
  projectId: number;

  ticketParams: any = {
    pageSize: 5,
    pageIndex: 0,
    filter: '',
    stateBy: 'passed',
  };

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

  constructor(private snackbar: SnackbarService,
              private ticketService: TicketService,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe(data => {
      this.projectId = data.project?.id; console.log(this.projectId);
    }, error => {
      this.snackbar.Success('Failed to load Related Data');
    }, () => {
      if (this.projectId != null) {
        this.ticketService.getProjectTickets(this.projectId, this.ticketParams ).subscribe( data => {
          this.ticketRes = data; console.log(data);
        }, error => {
          this.snackbar.Success('Failed to load table data');
        });
      }
    });
  }

  loadData(){
    this.ticketService.getProjectTickets(this.projectId, this.ticketParams).subscribe(data => {
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
