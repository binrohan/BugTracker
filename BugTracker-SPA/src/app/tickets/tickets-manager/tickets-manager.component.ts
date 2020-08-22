import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/_models/Project';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tickets-manager',
  templateUrl: './tickets-manager.component.html',
  styleUrls: ['./tickets-manager.component.css']
})
export class TicketsManagerComponent implements OnInit {
  project: Project;

  constructor(private snackbar: SnackbarService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data.project;
      console.log(this.project);
    }, error => {
      this.snackbar.Success('Problem Retriving Data');
    });
  }

}
