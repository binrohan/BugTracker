import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import {  HttpClientModule } from '@angular/common/http';

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
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

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
import { ProfileResolver } from './_resolvers/profile.resolver';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { UsersResolver } from './_resolvers/users.resolver';
import { ProjectsResolver } from './_resolvers/projects.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailsResolver } from './_resolvers/user-datails.resolver';
import { ProjectDetailsResolver } from './_resolvers/project-details.resolver';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketsResolver } from './_resolvers/ticket.resolver';


export function tokenGetter() {
   return localStorage.getItem('token');
}

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
      UserDetailsComponent,
      SnackbarMessageComponent,
      TicketFormComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
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
      ReactiveFormsModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatCheckboxModule,
      MatTabsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSelectModule,


      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      UserService,
      ProfileResolver,
      UsersResolver,
      ProjectsResolver,
      UserDetailsResolver,
      ProjectDetailsResolver,
      TicketsResolver,
      AuthGuard,
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
