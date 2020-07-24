import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../_services/snackbar.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { AuthService } from '../_services/auth.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-UserManagement',
  templateUrl: './UserManagement.component.html',
  styleUrls: ['./UserManagement.component.css']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = [ 'No.', 'Name', 'Email', 'Phone', 'Roles', 'Action'];
  i = 0;

  users: User;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private snackbar: SnackbarService,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users;
    });
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.users.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    // const data = this.desserts.slice();
    // if (!sort.active || sort.direction === '') {
    //   this.sortedData = data;
    //   return;
    // }
  }

// this.sortedData = data.sort((a, b) => {
//     const isAsc = sort.direction === 'asc';
//     switch (sort.active) {
//       case 'name': return compare(a.name, b.name, isAsc);
//       case 'calories': return compare(a.calories, b.calories, isAsc);
//       case 'fat': return compare(a.fat, b.fat, isAsc);
//       case 'carbs': return compare(a.carbs, b.carbs, isAsc);
//       case 'protein': return compare(a.protein, b.protein, isAsc);
//       default: return 0;
//     }
//   });

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//     return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
//   }
}

