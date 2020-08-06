import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../_models/Project';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from '../../_services/project.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { SnackbarService } from '../../_services/snackbar.service';
import { AdminService } from '../../_services/admin.service';
import { ProjectRes } from '../../_models/ProjectRes';
import { EventEmitter } from 'protractor';
import { ProjectTableComponent } from '../project-table/project-table.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {

  @ViewChild(ProjectTableComponent) projectTable: ProjectTableComponent;

  tab = 0;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.tab = parseInt(this.route.snapshot.paramMap.get('tab'), 10);
  }

  onTabChange(){
    if (this.tab === 0) {
      this.projectTable.loadProjects();
    }
  }
  setIndex(e){
    this.tab = e;
  }
}

