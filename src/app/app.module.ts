import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MotpasseComponent } from './motpasse/motpasse.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { WebcamModule } from 'ngx-webcam';
import { ConseilComponent } from './PlanificationConseil/conseil/conseil.component';
import { SalleComponent } from './PlanificationConseil/salle/salle.component';
import { AjoutConsComponent } from './PlanificationConseil/ajout-cons/ajout-cons.component';
import { ModifierConsComponent } from './PlanificationConseil/modifier-cons/modifier-cons.component';
import { ListSalleComponent } from './PlanificationConseil/list-salle/list-salle.component';
import { CouncilManagementComponent } from './CouncilManagement/council-management.component';
import { EnseignantConseilComponent } from './PlanificationConseil/enseignant-conseil/enseignant-conseil.component';
import { PresidentCoseilComponent } from './PlanificationConseil/president-coseil/president-coseil.component';
import { SessionConseilComponent } from './PlanificationConseil/session-conseil/session-conseil.component';
import { ConseilEnCoursComponent } from './PlanificationConseil/conseil-en-cours/conseil-en-cours.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UtilisateurComponent,
    MotpasseComponent,
    ResetPasswordComponent,
    ConseilComponent,
    SalleComponent,
AjoutConsComponent,
ModifierConsComponent,
ListSalleComponent,
CouncilManagementComponent,
EnseignantConseilComponent,
PresidentCoseilComponent,
ConseilEnCoursComponent,
SessionConseilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    WebcamModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
