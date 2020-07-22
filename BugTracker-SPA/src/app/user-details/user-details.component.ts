import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { AdminService } from '../_services/admin.service';
import { SnackbarService } from '../_services/snackbar.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormControlName } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User;
  roles: any[];
  testform: NgForm;
  allRoles = ['Admin', 'Manager', 'Developer'];

  userRoles: any[];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
    this.roles = this.user.roles;
  }

  onSelect(e, value) {
    console.log('ck value' + value.value);
    if (e.target.checked) {
      console.log('checkIn' + value.value);
      if (!this.roles.includes(value.value)) {
        console.log('ck Not included' + value.value);
        this.roles.push(value.value);
        console.log('roles' + this.roles);
      }
    } else if (!e.target.checked) {
      const index = this.roles.indexOf(value.value);
      this.roles.splice(index, 1);
    }
  }

  updateUserRole() {
    const newRoleSet = { roleNames: this.roles };
    console.log(newRoleSet.roleNames);
    this.adminService.updateUserRole(this.user.id, newRoleSet).subscribe(() => {
      this.snackbar.Success('User roles Updated');
    }, err => {
      this.snackbar.Success('Error during update');
    });
  }
}
