import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../_services/snackbar.service';
import { AssistService } from '../_services/assist.service';
import { Category } from '../_models/Category';
import { Priority } from '../_models/Priority';
import { Status } from '../_models/Status';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  cate: Category[];
  pri: Priority[];
  sta: Status[];

  showInputCate: false;
  showInputPri: false;
  showInputSta: false;

  constructor(private assistService: AssistService,
              private snackbar: SnackbarService) { }

  ngOnInit() {
    this.loadCategory();
    this.loadPriority();
    this.loadStatus();
  }

  loadCategory(){
    this.assistService.getCate().subscribe((data) => {
      this.cate = data;
    }, error => {
      this.snackbar.Success('Error during load data');
    });
  }
  loadPriority(){
    this.assistService.getPri().subscribe((data) => {
      this.pri = data;
    }, error => {
      this.snackbar.Success('Error during load data');
    });
  }

  loadStatus(){
    this.assistService.getSta().subscribe((data) => {
      this.sta = data;
    }, error => {
      this.snackbar.Success('Error during load data');
    });
  }

  addCate(value: string){
    this.assistService.setCate({ticketCategory: value}).subscribe(() => {
      this.snackbar.Success('New value added');
    }, error => {
      this.snackbar.Success('Error during value adding');
    }, () => {
      this.loadCategory();
    });
  }

  addPri(value: string){
    this.assistService.setPri({ticketPriority: value}).subscribe(() => {
      this.snackbar.Success('New value added');
    }, error => {
      this.snackbar.Success('Error during value adding');
    }, () => {
      this.loadPriority();
    });
  }

  addSta(value: string){
    this.assistService.setSta({ticketStatus: value}).subscribe(() => {
      this.snackbar.Success('New value added');
    }, error => {
      this.snackbar.Success('Error during value adding');
    }, () => {
      this.loadStatus();
    });
  }

  RemoveCate(id: number){
    this.assistService.removeCate(id).subscribe(() => {
      this.snackbar.Success('Successfully removed');
    }, error => {
      this.snackbar.Success('Failed to remove');
    }, () => {
      this.loadCategory();
    });
  }

  RemoveSta(id: number){
    this.assistService.removeSta(id).subscribe(() => {
      this.snackbar.Success('Successfully removed');
    }, error => {
      this.snackbar.Success('Failed to remove');
    }, () => {
      this.loadStatus();
    });
  }

  RemovePri(id: number){
    this.assistService.removePri(id).subscribe(() => {
      this.snackbar.Success('Successfully removed');
    }, error => {
      this.snackbar.Success('Failed to remove');
    }, () => {
      this.loadPriority();
    });
  }

}

