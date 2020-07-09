import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../_services/snackbar.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-UserManagement',
  templateUrl: './UserManagement.component.html',
  styleUrls: ['./UserManagement.component.css']
})
export class UserManagementComponent implements OnInit {

  users: User;

  constructor(private route: ActivatedRoute,
              private snackbar: SnackbarService,
              private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users;
    });
  }

}
