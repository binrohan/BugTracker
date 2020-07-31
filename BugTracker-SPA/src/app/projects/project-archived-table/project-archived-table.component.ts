import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectRes } from 'src/app/_models/ProjectRes';
import { AdminService } from 'src/app/_services/admin.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-archived-table',
  templateUrl: './project-archived-table.component.html',
  styleUrls: ['./project-archived-table.component.css']
})
export class ProjectArchivedTableComponent implements OnInit {

  displayedColumns: string[] = [
    'Title',
    'Started',
    'Deadline',
    'Tickets',
    'Action',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 9, 15];
  pageIndex = 0;
  pagesize = 9;

  projectParams: any = { pageSize: this.pagesize, pageIndex: this.pageIndex, filter: '' , orderBy: 'Starteddesc', stateBy: 'archived'};

  projectRes: ProjectRes;

  constructor(private adminService: AdminService,
              private snackbar: SnackbarService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.projectRes = data.projectArchivedRes;
    });
  }

  loadProjects() {
    this.adminService.getProjects(this.projectParams).subscribe(
      (data) => {
      this.projectRes = data;
      },
      (error) => {
        this.snackbar.Success('Project refresh failed');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectParams.filter = filterValue;
    this.loadProjects();
  }

  sortData(sort: Sort) {
    if (sort.active) {
      this.projectParams.orderBy = (sort.active + sort.direction);
      console.log(this.projectParams.orderBy);
      this.loadProjects();
    }
  }

  paginating(e){
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.projectParams.pageSize = this.pagesize;
    this.projectParams.pageIndex = this.pageIndex;

    this.loadProjects();
  }

}
