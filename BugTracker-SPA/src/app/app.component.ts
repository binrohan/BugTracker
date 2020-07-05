import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SnackbarMessageComponent } from './snackbar-message/snackbar-message.component';
import { SnackbarService } from './_services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BugTracker-SPA';
  mode = 'over';
  shouldRun = true;
  hide = true;

  constructor(private snackbar: SnackbarService) {}

  snackBarMessege(){
    this.snackbar.Success('User Logout');
  }

}



