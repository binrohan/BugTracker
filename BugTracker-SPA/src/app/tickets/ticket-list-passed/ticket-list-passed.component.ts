import { Component, OnInit, Input } from '@angular/core';
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
  @Input() projectId: number;
  @Input() userId: number;
  ticketRes: TicketRes;


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
    if (this.projectId != null) {
      this.getTickets();
    } else {
      this.userService.getUser(this.userId).subscribe(data => {
        this.projectId = data.project?.id;
      }, error => {
        this.snackbar.Success('Failed to load Related Data');
      }, () => {
        if (this.projectId != null) {
          this.getTickets();
        }
      });
    }
  }

  getTickets(){
    this.ticketService.getProjectTickets(this.projectId, this.ticketParams ).subscribe( data => {
      this.ticketRes = data;
    }, error => {
      this.snackbar.Success('Failed to load table data');
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
