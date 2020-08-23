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
import { DataService } from './_services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Bug_Tracker';
  mode = 'over';
  shouldRun = true;
  hide = true;
  user: User;
  projectId: number;
  jwtHelper = new JwtHelperService();
  showToolbar = false;


  constructor(private snackbar: SnackbarService,
              public authService: AuthService,
              private router: Router,
              private dataService: DataService,
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

    if (this.authService.currentUser != null) {
      this.userService.getUser(this.authService.currentUser?.id).subscribe(data => {
      this.projectId = data.project?.id; console.log(this.projectId + '   app');
    }, error => {
      this.snackbar.Success('Something is wrong');
    });
  }

    this.dataService.currentProjectId.subscribe(id => {
      this.projectId = id;
      console.log(this.projectId + ' before app');
    });
    console.log(this.projectId + ' From app');
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
}



