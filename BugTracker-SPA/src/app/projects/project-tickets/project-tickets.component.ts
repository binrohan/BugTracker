import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/_models/Ticket';
import { TicketRes } from 'src/app/_models/TicketRes';

@Component({
  selector: 'app-project-tickets',
  templateUrl: './project-tickets.component.html',
  styleUrls: ['./project-tickets.component.css']
})
export class ProjectTicketsComponent implements OnInit {

  ticketRes: TicketRes;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.ticketRes = data.ticketRes;
      console.log(data);
    });
  }

}
