import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { SnackbarService } from '../_services/snackbar.service';
import { UserService } from '../_services/user.service';
import { DataService } from '../_services/data.service';

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

  projectId: number;

  styleForModal: any = {};

  // Get the modal
  modal = document.getElementById('myModal');
  // Get the button that opens the modal
  btn = document.getElementById('myBtn');
  // Get the <span> element that closes the modal
  span = document.getElementsByClassName('close')[0];

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbar: SnackbarService,
    private fb: FormBuilder,
    private userService: UserService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['dashboard']);
    }
    this.createLoginForm();
    this.dataService.currentProjectId.subscribe(i => this.projectId = i);
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
      (error) => {
        this.snackbar.Success('Failed to login');
      },
      () => {
        this.router.navigate(['dashboard']);
        this.userService.getUser(this.authService.currentUser.id).subscribe(data => {
          this.projectId = data.project?.id; console.log(this.projectId + '   login');
        }, error => {
          this.snackbar.Success('Something is wrong');
        }, () => {
          this.dataService.setProjectId(this.projectId);
        });
      }
    );
  }

  demoLogin(n: number){
    const loginModel = { email: '', password: 'password' };
    if (n === 1){
      loginModel.email = 'demoAdmin@mail.com';
    } else if (n === 2){
      loginModel.email = 'demoManager@mail.com';
    } else if (n === 3){
      loginModel.email = 'demoDeveloper@mail.com';
    } else if (n === 4){
      loginModel.email = 'demoOmni@mail.com';
    }
    this.authService.login(loginModel).subscribe(data => {
      this.snackbar.Success('Demo Login Succesful');
    }, error => {
      this.snackbar.Success('Problem in connection');
    }, () => {
      this.closeModal();
      this.router.navigate(['dashboard']);
    });
  }


  // When the user clicks on the button, open the modal
  openModal() {
    this.styleForModal = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
  }

  // When the user clicks on <span> (x), close the modal
  closeModal() {
    this.styleForModal = { display: 'none'};
  }
}
