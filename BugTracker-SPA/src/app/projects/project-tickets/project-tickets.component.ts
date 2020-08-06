import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/_models/Ticket';
import { TicketRes } from 'src/app/_models/TicketRes';
import { Sort } from '@angular/material/sort';
import { User } from 'src/app/_models/User';
import { MatPaginator } from '@angular/material/paginator';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { TicketService } from 'src/app/_services/ticket.service';

@Component({
  selector: 'app-project-tickets',
  templateUrl: './project-tickets.component.html',
  styleUrls: ['./project-tickets.component.css']
})
export class ProjectTicketsComponent implements OnInit {

  ticketRes: TicketRes;

  displayedColumns: string[] = [
    'id',
    'title',
    'updated',
    'submissionDate',
    'category',
    'priority',
    'status',
    'Action',
  ];

  pageSizeOptions: number[] = [5, 9, 15];
  pageIndex = 0;
  pagesize = 9;
  ticketParams: any = {pageSize: 9, pageIndex: 0, filter: '', orderBy: 'Starteddesc', stateBy: 'active'};
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;



  constructor(private route: ActivatedRoute,
              private snackbar: SnackbarService,
              private ticketService: TicketService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.ticketRes = data.ticketRes;
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
    this.ticketService.getProjectTickets(this.ticketRes.tickets.pop().projectId, this.ticketParams).subscribe(
      (data) => {
        this.ticketRes = data;
      },
      (error) => {
        this.snackbar.Success('Failed to Load');
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
