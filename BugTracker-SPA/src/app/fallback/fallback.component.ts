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
  user: User;

  constructor(private userService: UserService,
              private authService: AuthService,
              private snackbar: SnackbarService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getUser(this.authService.currentUser.id).subscribe( data => {
      this.user = data;
    }, () => {
      this.snackbar.Success('Something is wrong');
    }, () => {
      if (this.user.project != null){
        this.router.navigate(['/project/' + this.user.project.id]);
      }
    });
  }

}
