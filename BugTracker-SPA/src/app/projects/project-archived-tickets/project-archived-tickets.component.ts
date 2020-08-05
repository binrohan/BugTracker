import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { TicketRes } from 'src/app/_models/TicketRes';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { TicketService } from 'src/app/_services/ticket.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-project-archived-tickets',
  templateUrl: './project-archived-tickets.component.html',
  styleUrls: ['./project-archived-tickets.component.css']
})
export class ProjectArchivedTicketsComponent implements OnInit {
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
      this.ticketRes = data.archivedTicketRes;
    });
    console.log(this.ticketRes);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketParams.filter = filterValue;
    this.loadTickets();
  }

  sortData(sort: Sort) {
    if (sort.active) {
      this.ticketParams.orderBy = (sort.active + sort.direction);
      console.log(this.ticketParams.orderBy);
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
    console.log(e);
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.ticketParams.pageSize = this.pagesize;
    this.ticketParams.pageIndex = this.pageIndex;

    this.loadTickets();
  }

}
