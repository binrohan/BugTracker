import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/_models/Project';
import { DataService } from 'src/app/_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  @Output() goToIndex = new EventEmitter<number>();

  projectForm: FormGroup;
  newProject: Project;

  constructor(private fb: FormBuilder,
              private snackbar: SnackbarService,
              private projectService: ProjectService,
              private router: Router) { }

  ngOnInit() {
    this.createProjectForm();
  }

  createProjectForm(){
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      deadTime: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addProject(){
    if (this.projectForm.valid){
      this.newProject = Object.assign({}, this.projectForm.value);
      this.projectService.addProject(this.newProject).subscribe(() => {
        this.snackbar.Success('Project Added');
      }, err => {
        this.snackbar.Success('Failed to add project');
      }, () => {
        this.goToIndex.emit(0);
      });
    }
  }
}
