import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { CommentService } from '../_services/comment.service';
import { CommentRes } from '../_models/CommentRes';
import { Comment } from '../_models/Comment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { SnackbarService } from '../_services/snackbar.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  commentRes: CommentRes;
  @Input() ticketId: number;
  @Input() comments: any[];
  @Input() disableComments: boolean;

  displayedColumns: string[] = [
    'commenter',
    'content',
    'created'
  ];


  commentForm: FormGroup;
  newComment: Comment;

  pageSizeOptions: number[] = [5, 8, 12];
  pageIndex = 0;
  @Input() length: number;
  pagesize = 5;
  previousPageIndex: number;
  commentParams: any = { pageIndex: this.pageIndex, pageSize: this.pagesize, filter: '', oderBy: 'createdasc' };

  constructor(private snackbar: SnackbarService,
              private commentService: CommentService, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loadComments();
    this.createCommentForm();
  }

  createCommentForm(){
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.users.filter = filterValue.trim().toLowerCase();
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
    this.commentService.getComments(this.ticketId, this.commentParams).subscribe( data => {
      this.comments = data.comments;
      this.length = data.length;
    });
  }

  paginating(e){
    this.pagesize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.commentParams.pageSize = this.pagesize;
    this.commentParams.pageIndex = this.pageIndex;

    this.loadComments();
  }

  commentPost(){
    if (this.commentForm.valid){
      this.newComment = Object.assign({}, this.commentForm.value);
      this.newComment.created = new Date();
      this.newComment.ticketId = this.ticketId;
      this.newComment.commenterId = this.authService.decodedToken.nameid;

      this.commentService.addComment(this.newComment).subscribe(() => {
        this.snackbar.Success('Comment Posted');
        this.commentForm.reset();
        this.loadComments();
      }, error => {
        this.snackbar.Success('failed');
      }
      );
    }
  }

}
