import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/admin-dashboard/dashboard.component';
import { UserManagementComponent } from './UserManagement/UserManagement.component';
import { ProjectComponent } from './projects/project/project.component';
import { TicketComponent } from './tickets/ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileResolver } from './_resolvers/profile.resolver';
import { UsersResolver } from './_resolvers/users.resolver';
import { ProjectsResolver } from './_resolvers/projects.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailsResolver } from './_resolvers/user-datails.resolver';
import { ProjectDetailsResolver } from './_resolvers/project-details.resolver';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { TicketsResolver } from './_resolvers/ticket.resolver';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketDetailsResolver } from './_resolvers/ticket-details.resolver';
import { TicketEditComponent } from './tickets/ticket-edit/ticket-edit.component';
import { UserTicketsResolver } from './_resolvers/user-tickets.resolver';
import { ProjectsArchivedTableResolver } from './_resolvers/project-archived-table.resolver';
import { ProjectTicketsResolver } from './_resolvers/project-tickets.resolver';
import { ProjectUsersResolver } from './_resolvers/project-users.resolver';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { FreeUsersResolver } from './_resolvers/free-users.resolver';
import { ProjectArchivedTicketsResolver } from './_resolvers/project-archived-tickets.resolver';
import { TicketsArchivedResolver } from './_resolvers/ticket-archived.resolver';
import { SettingsComponent } from './settings/settings.component';
import { TicketsApprovedResolver } from './_resolvers/ticket-approved.resolver';
import { MyTicketsComponent } from './tickets/my-tickets/my-tickets.component';
import { ProjectTicketsComponent } from './projects/project-tickets/project-tickets.component';
import { TicketFormComponent } from './tickets/ticket-form/ticket-form.component';
import { FallbackComponent } from './fallback/fallback.component';
export const appRoutes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: '', component: LoginComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'user/:id',
        component: UserDetailsComponent,
        resolve: {
          user: UserDetailsResolver,
          ticketRes: UserTicketsResolver,
          projectRes: ProjectsResolver,
        },
      },
      {
        path: 'users',
        component: UserManagementComponent,
        resolve: { users: UsersResolver },
        data: { roles: ['Admin'] },
      },
      {
        path: 'projects/:tab',
        component: ProjectComponent,
        resolve: {
          projectRes: ProjectsResolver,
          projectArchivedRes: ProjectsArchivedTableResolver,
        },
      },
      {
        path: 'project/:id',
        component: ProjectDetailComponent,
        resolve: {
          project: ProjectDetailsResolver,
          ticketRes: ProjectTicketsResolver,
          userRes: ProjectUsersResolver,
          freeRes: FreeUsersResolver,
          archivedTicketRes: ProjectArchivedTicketsResolver,
        },
      },
      {
        path: 'project/edit/:id',
        component: ProjectEditComponent,
        resolve: { project: ProjectDetailsResolver },
      },
      {
        path: 'tickets/:tab',
        component: TicketComponent,
        resolve: {
          ticketRes: TicketsResolver,
          archivedTicketRes: TicketsArchivedResolver,
        },
      },
      {
        path: 'ticket/:id',
        component: TicketDetailComponent,
        resolve: { ticket: TicketDetailsResolver },
      },
      {
        path: 'ticket/edit/:id',
        component: TicketEditComponent,
        resolve: { ticket: TicketDetailsResolver },
      },
      {
        path: 'myTickets',
        component: MyTicketsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        resolve: { user: ProfileResolver },
        canDeactivate: [PreventUnsavedChanges],
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'fallback',
        component: FallbackComponent
      }
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
