import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() CommentRes: any;
  @Input() comments: Comment[];
  displayedColumns: string[] = [
    'commenter',
    'content',
    'created',
    'action'
  ];

  pageSizeOptions: number[] = [5, 8, 12];
  pageIndex = 0;
  length: number;
  pagesize = 5;
  previousPageIndex: number;
  commentParams: any = { pageIndex: this.pageIndex, pageSize: this.pagesize, filter: '' };

  constructor() { }

  ngOnInit() {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.users.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
    this.commentParams.filter = filterValue;
    this.loadComments();
  }

  sortData(sort: Sort) {
    if (sort.active) {
      this.commentParams.orderBy = (sort.active + sort.direction);
      this.loadComments();
    }
  }
  loadComments() {
    
  }

  paginating(e){
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.commentParams.pageSize = this.pagesize;
    this.commentParams.pageIndex = this.pageIndex;

    this.loadComments();
  }

}
