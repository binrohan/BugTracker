import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { SnackbarService } from '../_services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  model: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  goToRegistration() {
    this.router.navigate(['registration']);
  }

  login() {
    console.log(this.model);
    this.authService.login(this.model).subscribe(
      (next) => {
        this.snackbar.Success('Logged in successfully');
      },
      (err) => {
        this.snackbar.Success(err);
      },
      () => {
        this.router.navigate(['dashboard']);
      }
    );
  }
}
