import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../_services/snackbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
  }

}
