import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { ProjectRes } from 'src/app/_models/ProjectRes';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { Sort } from '@angular/material/sort';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {



  displayedColumns: string[] = [
    'Title',
    'Started',
    'Deadline',
    'Tickets',
    'Action',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 15];
  pageIndex = 0;
  pagesize = 10;

  projectParams: any = { pageSize: this.pagesize, pageIndex: this.pageIndex, filter: '' , orderBy: 'Starteddesc', stateBy: 'active'};

  projectRes: ProjectRes;


  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private snackbar: SnackbarService,
              private dataService: DataService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.projectRes = data.projectRes;
    });
    if (this.dataService.subsVar === undefined) {
      this.dataService.subsVar = this.dataService.invokeProjectTable.subscribe((name: string) => {
        this.loadProjects();
      });
    }
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
