import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { MotpasseComponent } from './motpasse/motpasse.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RectificationComponent } from './rectification/rectification.component';
import { DashboardEnseignantComponent } from './dashboard-enseignant/dashboard-enseignant.component';
import { DashboardChefComponent } from './dashboard-chef/dashboard-chef.component';
import { AdminSetupComponent } from './admin-setup/admin-setup.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  // Public routes
  { path: 'utilisateur', component: UtilisateurComponent },
  { path: 'motpasseoublie', component: MotpasseComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'admin-setup', component: AdminSetupComponent },

  // Protected routes with role-based access
  {
    path: 'dashboard-enseignant',
    component: DashboardEnseignantComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['enseignant'] }
  },
  {
    path: 'dashboard-chef',
    component: DashboardChefComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['chef departement'] }
  },
  {
    path: 'rectification',
    component: RectificationComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['enseignant'] }
  },

  // Legacy dashboard route - will redirect based on role
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  // Default route
  { path: '', redirectTo: 'utilisateur', pathMatch: 'full' },

  // Wildcard route - redirect to login
  { path: '**', redirectTo: 'utilisateur' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
