import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { MotpasseComponent } from './motpasse/motpasse.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { WebcamModule } from 'ngx-webcam';
import { RectificationComponent } from './rectification/rectification.component';
import { DashboardEnseignantComponent } from './dashboard-enseignant/dashboard-enseignant.component';
import { DashboardChefComponent } from './dashboard-chef/dashboard-chef.component';
import { AdminSetupComponent } from './admin-setup/admin-setup.component';
import { GradeCorrectionComponent } from './grade-correction/grade-correction.component';
import { RectificationManagementComponent } from './rectification-management/rectification-management.component';
import { ReportManagementComponent } from './report-management/report-management.component';
import { DashboardRapporteurComponent } from './dashboard-rapporteur/dashboard-rapporteur.component';
import { TestBackendComponent } from './test-backend/test-backend.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { DataFilterComponent } from './shared/data-filter/data-filter.component';
import { ProfilePictureComponent } from './shared/profile-picture/profile-picture.component';
// Services and Guards
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UtilisateurComponent,
    MotpasseComponent,
    ResetPasswordComponent,
    RectificationComponent,
    DashboardEnseignantComponent,
    DashboardChefComponent,
    AdminSetupComponent,
    GradeCorrectionComponent,
    RectificationManagementComponent,
    ReportManagementComponent,
    DashboardRapporteurComponent,
    TestBackendComponent,
    ProfileComponent,
    DashboardAdminComponent,
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    DataFilterComponent,
    ProfilePictureComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    WebcamModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
