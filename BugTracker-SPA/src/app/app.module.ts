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
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/admin-dashboard/dashboard.component';
import { UserManagementComponent } from './UserManagement/UserManagement.component';
import { TicketComponent } from './tickets/ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { appRoutes } from './routes';
import { SnackbarMessageComponent } from './snackbar-message/snackbar-message.component';
import { ProfileResolver } from './_resolvers/profile.resolver';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { ProjectsResolver } from './_resolvers/projects.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailsResolver } from './_resolvers/user-datails.resolver';
import { ProjectDetailsResolver } from './_resolvers/project-details.resolver';
import { TicketFormComponent } from './tickets/ticket-form/ticket-form.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketListArchivedComponent } from './tickets/ticket-list-archived/ticket-list-archived.component';
import { TicketDetailsResolver } from './_resolvers/ticket-details.resolver';
import { CommentComponent } from './comment/comment.component';
import { TicketEditComponent } from './tickets/ticket-edit/ticket-edit.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { ProjectTableComponent } from './projects/project-table/project-table.component';
import { ProjectArchivedTableComponent } from './projects/project-archived-table/project-archived-table.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectComponent } from './projects/project/project.component';
import { DataService } from './_services/data.service';
import { UserTicketsComponent } from './user-profile/user-tickets/user-tickets.component';
import { UserTicketsResolver } from './_resolvers/user-tickets.resolver';
import { ProjectsArchivedTableResolver } from './_resolvers/project-archived-table.resolver';
import { ProjectBasicComponent } from './projects/project-basic/project-basic.component';
import { ProjectUsersComponent } from './projects/project-users/project-users.component';
import { ProjectTicketsComponent } from './projects/project-tickets/project-tickets.component';
import { ProjectArchivedTicketsResolver } from './_resolvers/project-archived-tickets.resolver';
import { ProjectTicketsResolver } from './_resolvers/project-tickets.resolver';
import { ProjectUsersResolver } from './_resolvers/project-users.resolver';
import { FreeUsersComponent } from './free-users/free-users.component';
import { FreeUsersResolver } from './_resolvers/free-users.resolver';
import { ProjectArchivedTicketsComponent } from './projects/project-archived-tickets/project-archived-tickets.component';
import { SettingsComponent } from './settings/settings.component';
import { TicketListApprovedComponent } from './tickets/ticket-list-approved/ticket-list-approved.component';
import { TicketsApprovedResolver } from './_resolvers/ticket-approved.resolver';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard/manager-dashboard.component';
import { DeveloperDashboardComponent } from './dashboard/developer-dashboard/developer-dashboard.component';
import { TicketListPassedComponent } from './tickets/ticket-list-passed/ticket-list-passed.component';
import { TicketListPassedUserComponent } from './tickets/ticket-list-passed-user/ticket-list-passed-user.component';
import { MyTicketsComponent } from './tickets/my-tickets/my-tickets.component';
import { MyTicketsArchivedComponent } from './tickets/my-tickets-archived/my-tickets-archived.component';
import { MyTicketsApprovedComponent } from './tickets/my-tickets-approved/my-tickets-approved.component';
import { MyTicketsActiveComponent } from './tickets/my-tickets-active/my-tickets-active.component';
import { FallbackComponent } from './fallback/fallback.component';
import { NewUsersComponent } from './new-users/new-users.component';
import { LocalTimePipe } from './_pipe/local-time.pipe';


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
      TicketFormComponent,
      TicketListComponent,
      TicketListArchivedComponent,
      TicketListApprovedComponent,
      TicketListPassedComponent,
      TicketListPassedUserComponent,
      CommentComponent,
      TicketEditComponent,
      ProjectTableComponent,
      ProjectArchivedTableComponent,
      ProjectFormComponent,
      ProjectEditComponent,
      ProjectBasicComponent,
      ProjectUsersComponent,
      ProjectTicketsComponent,
      ProjectArchivedTicketsComponent,
      UserTicketsComponent,
      FreeUsersComponent,
      ManagerDashboardComponent,
      DeveloperDashboardComponent,
      HasRoleDirective,
      SettingsComponent,
      MyTicketsComponent,
      MyTicketsArchivedComponent,
      MyTicketsApprovedComponent,
      MyTicketsActiveComponent,
      FallbackComponent,
      NewUsersComponent,
      LocalTimePipe
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
      MatCardModule,
      MatExpansionModule,


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
      ProjectsResolver,
      UserDetailsResolver,
      ProjectDetailsResolver,
      TicketDetailsResolver,
      UserTicketsResolver,
      ProjectsArchivedTableResolver,
      ProjectTicketsResolver,
      ProjectUsersResolver,
      AuthGuard,
      PreventUnsavedChanges,
      FreeUsersResolver,
      ProjectArchivedTicketsResolver,
      TicketsApprovedResolver,
      DataService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
