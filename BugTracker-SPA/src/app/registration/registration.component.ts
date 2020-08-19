import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../_services/snackbar.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  hide = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackbar: SnackbarService,
              private authService: AuthService) { }

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['male', Validators.required],
      adrs_local: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.snackbar.Success('Registration Successful');
      }, err => {
        this.snackbar.Success('User can not registered');
      }, () => {
                this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      });
    }
  }

  getErrorMessage() {
    if (this.registerForm.controls.email.errors.required) {
      return 'You must enter a value';
    }
    return this.registerForm.controls.email.errors.email ? 'Not a valid email' : '';
  }

}
