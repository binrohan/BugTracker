import { Component, OnInit, Output } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/_models/Project';
import { EventEmitter } from 'protractor';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;
  newProject: Project;

  constructor(private fb: FormBuilder,
              private snackbar: SnackbarService,
              private projectService: ProjectService,
              private dataService: DataService) { }

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
        this.projectForm.reset();
        this.projectForm.markAsUntouched();
        this.reloadProjectTable();
      }, err => {
        this.snackbar.Success('Failed to add project');
      });
    }
  }

  reloadProjectTable(){
    this.dataService.onProjectFormButtonClick();
  }
}
