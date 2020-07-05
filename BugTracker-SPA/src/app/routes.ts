import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './UserManagement/UserManagement.component';
import { ProjectComponent } from './project/project.component';
import { TicketComponent } from './ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'users', component: UserManagementComponent},
    { path: 'projects', component: ProjectComponent},
    { path: 'tickets', component: TicketComponent},
    { path: 'profile', component: ProfileComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full' }

];
