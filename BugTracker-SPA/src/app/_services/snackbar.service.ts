import { Injectable, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarMessageComponent } from '../snackbar-message/snackbar-message.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  Success(message: string) {
    this.snackbar.open(message, '', {
      duration: 2000
    });
  }
}

