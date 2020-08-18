import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/admin-dashboard/dashboard.component';
import { SnackbarMessageComponent } from './snackbar-message/snackbar-message.component';
import { SnackbarService } from './_services/snackbar.service';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { User } from './_models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { share } from 'rxjs/operators';
import { UserService } from './_services/user.service';

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
  user: User;
  userDetails: User;
  jwtHelper = new JwtHelperService();
  showToolbar = false;
  projectLink = '';
  isProjectNull = true;

  constructor(private snackbar: SnackbarService,
              public authService: AuthService,
              private router: Router,
              private userService: UserService) { }
  ngOnInit() {
    const token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
    if (token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (this.user) {
      this.authService.currentUser = this.user;
    }
    this.userProject();
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.snackbar.Success('logout');
    this.router.navigate(['']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  userProject(){
    if (!this.authService.loggedIn()){
      return false;
    }
    this.userService.getUser(this.authService.decodedToken?.nameid).subscribe(data => {
      this.userDetails = data;
    }, error => {
      this.snackbar.Success('Something worng');
    }, () => {
      this.projectLink = '/project/' + this.userDetails.project?.id;
      this.isProjectNull = this.userDetails.project ? false : true;
    });
  }

}



