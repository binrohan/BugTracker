import { Component, OnInit, Input } from '@angular/core';
import { TicketRes } from 'src/app/_models/TicketRes';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { TicketService } from 'src/app/_services/ticket.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-tm-ticket-table',
  templateUrl: './tm-ticket-table.component.html',
  styleUrls: ['./tm-ticket-table.component.css']
})
export class TmTicketTableComponent implements OnInit {
  @Input() projectId: number;
  @Input() ticketState: string;

  ticketRes: TicketRes;

  displayedColumns: string[] = [
    'title',
    'user',
    'updated',
    'submissionDate',
    'category',
    'priority',
    'status',
    'Action',
  ];
  pageSizeOptions: number[] = [5, 10, 15];
  pageIndex = 0;
  pagesize = 10;

  ticketParams: any = {
    pageSize: this.pagesize,
    pageIndex: this.pageIndex,
    filter: '',
    orderBy: 'updateddesc',
    stateBy: this.ticketState,
  };

  constructor(private snackbar: SnackbarService,
              private ticketService: TicketService,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.ticketParams.stateBy = this.ticketState;
    this.loadTickets();
  }

  loadTickets(){
    if (this.projectId == null) {
      this.snackbar.Success('You are not assigned to any project');
      return false;
    }
    this.ticketService.getProjectTickets(this.projectId, this.ticketParams).subscribe(data => {
      this.ticketRes = data;
    }, error => {
      this.snackbar.Success('Connection Error');
    });
  }

  applyFilter(event: Event) {
    if (this.projectId == null) {
      return false;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketParams.filter = filterValue;
    this.loadTickets();
  }

  sortData(sort: Sort) {
    if (this.projectId == null) {
      return false;
    }
    if (sort.active) {
      this.ticketParams.orderBy = (sort.active + sort.direction);
      this.loadTickets();
    }
  }

  paginating(e){
    if (this.projectId == null) {
      return false;
    }
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.ticketParams.pageSize = this.pagesize;
    this.ticketParams.pageIndex = this.pageIndex;

    this.loadTickets();
  }

}
