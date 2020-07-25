import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
  @Input() projectIdFromParent: number;
  @Input() userIdFromParent: number;
  @Output() closeform = new EventEmitter<boolean>();
  ticketForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createTicketForm();
    this.loadData();
  }
  createTicketForm(projectId?: number, userId?: number){
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      submissionDate: ['', Validators.required],
      projectId: ['Hello', Validators.required],
      userId: ['', Validators.required],
      categoryId: ['', Validators.required],
      priorityId: ['', Validators.required],
      statusId: ['', Validators.required]
    });
  }
  addTicket(){
    console.log(this.ticketForm.value);
  }
  loadData(){
    
  }

  resetOrsendToParent(){
    this.closeform.emit(false);
    this.ticketForm.reset();
  }
}
