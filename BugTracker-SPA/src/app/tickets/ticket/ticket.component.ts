import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../../_models/Ticket';
import { Sort } from '@angular/material/sort';
import { TicketService } from '../../_services/ticket.service';
import { TicketRes } from '../../_models/TicketRes';
import { AdminService } from 'src/app/_services/admin.service';
import { TicketListComponent } from '../ticket-list/ticket-list.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  currentTabIndex = 0;

  @ViewChild(TicketListComponent) ticketList: TicketListComponent;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentTabIndex = parseInt(this.route.snapshot.paramMap.get('tab'), 10);
  }
  onTabChange(){
    if (this.currentTabIndex === 0) {
      this.ticketList.loadTickets();
    }
  }
}
