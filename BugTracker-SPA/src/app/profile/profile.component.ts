import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../_models/User';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../_services/snackbar.service';
import { FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  userUpdateForm: FormGroup;
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  isNameLock = true;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private snackbar: SnackbarService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
  }

  updateUser(){
    let u: User;
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
     .subscribe(next => {
       this.snackbar.Success('User updated');
       this.editForm.reset(this.user);
       this.isNameLock = true;
       u = next;
     }, error => {
       this.snackbar.Success(error);
     }, () => {
      localStorage.setItem('user', JSON.stringify(u));
     });
  }
}
