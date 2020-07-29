import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../_models/Project';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from '../_services/project.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { SnackbarService } from '../_services/snackbar.service';
import { AdminService } from '../_services/admin.service';
import { ProjectRes } from '../_models/ProjectRes';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    'Id',
    'Title',
    'Started',
    'Deadline',
    'Tickets',
    'Action',
  ];
  projects: Project[];
  archivedProjects: Project[];
  length: number;
  archivedLength: number;
  projectRes: ProjectRes;
  archivedProjectRes: ProjectRes;
  isArchived = true;
  projectForm: FormGroup;
  newProject: Project;

  pageSizeOptions: number[] = [5, 9, 15];
  pageIndex = 0;
  pagesize = 9;

  projectParams: any = { pageSize: this.pagesize, pageIndex: this.pageIndex, filter: '' , orderBy: 'Starteddesc', stateBy: 'active'};
  archivedProjectParams: any = { pageSize: this.pagesize, pageIndex: this.pageIndex, filter: '' , orderBy: 'Starteddesc', stateBy: 'archived'};


  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: SnackbarService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.projectRes = data.projectRes;
      this.projects = this.projectRes.projects;
      this.length = this.projectRes.length;
    });
    this.loadArchivedProjects();
    this.createProjectForm();
  }

  loadArchivedProjects() {
    this.adminService.getProjects(this.archivedProjectParams).subscribe(
      (data) => {
      this.archivedProjectRes = data;
      this.archivedProjects = this.projectRes.projects;
      this.archivedLength = this.projectRes.length;
      },
      (error) => {}
    );
  }
  loadProjects() {
    this.adminService.getProjects(this.projectParams).subscribe(
      (data) => {
      this.projectRes = data;
      this.projects = this.projectRes.projects;
      this.length = this.projectRes.length;
      },
      (error) => {}
    );
  }

  addProject(){
    if (this.projectForm.valid){
      this.newProject = Object.assign({}, this.projectForm.value);
      console.log(this.newProject);
      const id = this.authService.decodedToken.nameid;
      this.projectService.addProject(id, this.newProject).subscribe(() => {
        this.snackbar.Success('Project Added');
      }, err => {
        this.snackbar.Success('Error');
      }, () => {
        this.adminService.getProjects(this.projectParams).subscribe( data => {
          this.projects = data.projects;
          this.length = data.length;
        });
      });
    }
  }

  createProjectForm(){
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      deadTime: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.users.filter = filterValue.trim().toLowerCase();
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
    console.log(e);
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.projectParams.pageSize = this.pagesize;
    this.projectParams.pageIndex = this.pageIndex;

    this.loadProjects();
  }

}
