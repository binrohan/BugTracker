import { Component, OnInit } from '@angular/core';
import { AssistService } from '../../_services/assist.service';
import { SnackbarService } from '../../_services/snackbar.service';
import { Category } from '../../_models/Category';
import { Priority } from '../../_models/Priority';
import { Status } from '../../_models/Status';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  now: Date = new Date();
  counts: any = {};
  cate: Category[];
  pri: Priority[];
  sta: Status[];
  userId: string;

  constructor(private assistService: AssistService,
              private snackbar: SnackbarService,
              private authService: AuthService) {
                setInterval(() => {
                  this.now = new Date();
                });
              }

  ngOnInit() {
    this.userId = this.authService.decodedToken.nameid;
    this.loadCounts();
    this.loadTypes();
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