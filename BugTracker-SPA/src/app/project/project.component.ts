import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../_models/Project';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from '../_services/project.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { SnackbarService } from '../_services/snackbar.service';

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
  archivedProject: Project[];
  isArchived = true;
  projectForm: FormGroup;
  newProject: Project;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.projects = data.projects;
    });
    this.getArchivedProject();
    this.createProjectForm();
  }

  getArchivedProject() {
    this.projectService.getProjects(this.isArchived).subscribe(
      (data) => {
        this.archivedProject = data;
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
        this.projectService.getProjects(false).subscribe( data => {
          this.projects = data;
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
}
