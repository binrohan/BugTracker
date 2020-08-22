import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';
import { SnackbarService } from '../_services/snackbar.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-fallback',
  templateUrl: './fallback.component.html',
  styleUrls: ['./fallback.component.css']
})
export class FallbackComponent implements OnInit {


  constructor() { }

  ngOnInit() {}

}
