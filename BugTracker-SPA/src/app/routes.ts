import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './UserManagement/UserManagement.component';
import { ProjectComponent } from './project/project.component';
import { TicketComponent } from './ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';

export const appRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'users', component: UserManagementComponent},
    { path: 'projects', component: ProjectComponent},
    { path: 'tickets', component: TicketComponent},
    { path: 'profile', component: ProfileComponent},
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }

]