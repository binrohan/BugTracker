import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/_services/project.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AssistService } from 'src/app/_services/assist.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { Project } from 'src/app/_models/Project';
import { User } from 'src/app/_models/User';
import { Category } from 'src/app/_models/Category';
import { Status } from 'src/app/_models/Status';
import { Priority } from 'src/app/_models/Priority';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  events: string[] = [];

  project: Project;
  updatedProject: Project;
  projectEditForm: FormGroup;


  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private fb: FormBuilder,
              private snackbar: SnackbarService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data.project;
    });
    this.createEditProjectForm();
  }

  createEditProjectForm(projectId?: number, userId?: number) {
    this.projectEditForm = this.fb.group({
      title: [this.project.title, Validators.required],
      description: [this.project.description, Validators.required],
      deadTime: [this.project.deadTime, Validators.required]
    });
  }

  updateProject(){
    if (this.projectEditForm.valid) {
      this.updatedProject = Object.assign({}, this.projectEditForm.value);
      this.projectService.updateProject(this.project.id, this.updatedProject).subscribe(() => {
        this.projectService.getProject(this.project.id).subscribe(data => {
          this.project = data;
        });
        this.snackbar.Success('Project Updated');
      }, err => {
        this.snackbar.Success('Error during update');
      });
    }
  }
}
