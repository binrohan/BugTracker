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

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'users', component: UserManagementComponent, resolve: {users: UsersResolver}},
    { path: 'projects', component: ProjectComponent, resolve: {projects: ProjectsResolver}},
    { path: 'tickets', component: TicketComponent},
    { path: 'profile', component: ProfileComponent, resolve: {user: ProfileResolver}},
    { path: '**', redirectTo: 'login', pathMatch: 'full' }

];
