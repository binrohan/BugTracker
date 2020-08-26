import { Component, OnInit, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_models/Project';
import { ProjectService } from 'src/app/_services/project.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-project-basic',
  templateUrl: './project-basic.component.html',
  styleUrls: ['./project-basic.component.css']
})
export class ProjectBasicComponent implements OnInit {



  projectBasic: Project;

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
              private snackbar: SnackbarService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.projectBasic = data.project;
      this.subDate(this.projectBasic.deadTime);
    });
  }

  archivedProject(){
    if (this.projectBasic.tickets.length > 0) {
      this.snackbar.Success('First handle the Tickets');
      return false;
    }
    if (!confirm('Are you sure?')) {
      return false;
    }
    this.projectService.archiveProject(this.projectBasic.id).subscribe(() => {
      this.snackbar.Success('Project Successfully Archived');
    }, error => {
      this.snackbar.Success('Failed to archive the project');
    });
  }
  subDate(thedate: any): any{
    thedate = thedate + 'Z';
  }
}
