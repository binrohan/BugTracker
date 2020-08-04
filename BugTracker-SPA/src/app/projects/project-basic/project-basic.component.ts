import { Component, OnInit, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_models/Project';

@Component({
  selector: 'app-project-basic',
  templateUrl: './project-basic.component.html',
  styleUrls: ['./project-basic.component.css']
})
export class ProjectBasicComponent implements OnInit {

  @Output() projectId =  new EventEmitter<any>();

  projectBasic: Project;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.projectBasic = data.project;
      this.projectId.emit(this.projectBasic.id);
    });
  }


}
