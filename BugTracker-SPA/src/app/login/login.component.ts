import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
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
  password = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]);
  loginForm: FormGroup;
  hide = true;
  model: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbar: SnackbarService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['dashboard']);
    }
    this.createLoginForm();

  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['password', [Validators.required]]
    });
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

    this.authService.login(this.loginForm.value).subscribe(
      (next) => {
        this.snackbar.Success('Logged in successfully');
      },
      (err) => {
        this.snackbar.Success(err.toString());
      },
      () => {
        this.router.navigate(['dashboard']);
      }
    );
  }
}
