import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './UserManagement/UserManagement.component';
import { ProjectComponent } from './project/project.component';
import { TicketComponent } from './ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { appRoutes } from './routes';
import { SnackbarMessageComponent } from './snackbar-message/snackbar-message.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      RegistrationComponent,
      DashboardComponent,
      UserManagementComponent,
      ProjectComponent,
      TicketComponent,
      ProfileComponent,
      TicketDetailComponent,
      ProjectDetailComponent,
      SnackbarMessageComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatSidenavModule,
      MatRadioModule,
      MatFormFieldModule,
      MatInputModule,
      MatDividerModule,
      MatListModule,
      MatSnackBarModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
