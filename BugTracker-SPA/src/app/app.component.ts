import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SnackbarMessageComponent } from './snackbar-message/snackbar-message.component';
import { SnackbarService } from './_services/snackbar.service';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { User } from './_models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BugTracker-SPA';
  mode = 'over';
  shouldRun = true;
  hide = true;
  jwtHelper = new JwtHelperService();

  constructor(private snackbar: SnackbarService,
              private authService: AuthService,
              private router: Router) {}
  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
    }
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.snackbar.Success('logout');
    this.router.navigate(['/login']);
  }

}



