import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../_models/Ticket';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

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
  displayedArchivedColumns: string[] = [
    'id',
    'title',
    'projectName',
    'submissionDate',
    'category',
    'Action',
  ];
  tickets: Ticket;
  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.tickets = data.tickets;
    });
    console.log(this.tickets);
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.users.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    // const data = this.desserts.slice();
    // if (!sort.active || sort.direction === '') {
    //   this.sortedData = data;
    //   return;
    // }
  }
}
