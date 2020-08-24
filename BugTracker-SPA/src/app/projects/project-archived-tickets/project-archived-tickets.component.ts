import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  @Input() projectId: number;

  ticketRes: TicketRes;

  displayedColumns: string[] = [
    'title',
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
  ticketParams: any = {pageSize: this.pagesize, pageIndex: this.pageIndex, filter: '', orderBy: 'Starteddesc', stateBy: 'archived'};
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;



  constructor(private route: ActivatedRoute,
              private snackbar: SnackbarService,
              private ticketService: TicketService) { }

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
    this.ticketService.getProjectTickets(this.projectId, this.ticketParams).subscribe(
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
