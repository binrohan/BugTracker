import { Component, OnInit } from '@angular/core';
import { Priority } from 'src/app/_models/Priority';
import { Category } from 'src/app/_models/Category';
import { Status } from 'src/app/_models/Status';
import { AssistService } from 'src/app/_services/assist.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  counts: any = {};
  pri: Priority[];
  cate: Category[];
  sta: Status[];
  now: Date = new Date();
  userId: string;

  constructor(private assistService: AssistService,
              private snackbar: SnackbarService,
              private authService: AuthService) {
                setInterval(() => {
                  this.now = new Date();
                });
               }

  ngOnInit() {
    this.loadCounts();
    this.loadTypes();
    this. userId = this.authService.decodedToken.nameid;
  }

  loadCounts(){
    this.assistService.getCounts().subscribe(data => {
      this.counts = data;
    }, error => {
      this.snackbar.Success('Failed to load data');
    });
  }

  loadTypes(){
    this.assistService.getCate().subscribe(data => {
      this.cate = data;
    }, error => {
      this.snackbar.Success('Failed to load data');
    });
    this.assistService.getPri().subscribe(data => {
      this.pri = data;
    }, error => {
      this.snackbar.Success('Failed to load data');
    });
    this.assistService.getSta().subscribe(data => {
      this.sta = data;
    }, error => {
      this.snackbar.Success('Failed to load data');
    });
  }

}
