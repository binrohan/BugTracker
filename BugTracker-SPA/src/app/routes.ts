import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './UserManagement/UserManagement.component';
import { ProjectComponent } from './project/project.component';
import { TicketComponent } from './ticket/ticket.component';
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
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TicketsResolver } from './_resolvers/ticket.resolver';

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
        component: DashboardComponent
      },
      { path: 'user/:id', component: UserDetailsComponent, resolve: {user: UserDetailsResolver} },
      {
        path: 'users',
        component: UserManagementComponent,
        resolve: { users: UsersResolver }
      },
      {
        path: 'projects',
        component: ProjectComponent,
        resolve: { projects: ProjectsResolver }
      },
      {
        path: 'project/:id',
        component: ProjectDetailComponent,
        resolve: { project: ProjectDetailsResolver }
      },
      { path: 'tickets', component: TicketComponent,
        resolve: {ticketRes: TicketsResolver} },
      {
        path: 'profile',
        component: ProfileComponent,
        resolve: { user: ProfileResolver },
        canDeactivate: [PreventUnsavedChanges]
      }
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
