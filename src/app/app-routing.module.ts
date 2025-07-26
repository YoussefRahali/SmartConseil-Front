import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { MotpasseComponent } from './motpasse/motpasse.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConseilComponent } from './PlanificationConseil/conseil/conseil.component';
import { SalleComponent } from './PlanificationConseil/salle/salle.component';
import { AjoutConsComponent } from './PlanificationConseil/ajout-cons/ajout-cons.component';
import { ModifierConsComponent } from './PlanificationConseil/modifier-cons/modifier-cons.component';
import { ListSalleComponent } from './PlanificationConseil/list-salle/list-salle.component';
import { CouncilManagementComponent } from './CouncilManagement/council-management.component';
import { EnseignantConseilComponent } from './PlanificationConseil/enseignant-conseil/enseignant-conseil.component';
import { PresidentCoseilComponent } from './PlanificationConseil/president-coseil/president-coseil.component';
import { SessionConseilComponent } from './PlanificationConseil/session-conseil/session-conseil.component';

const routes: Routes = [

{path:'dashboard',component:DashboardComponent},

{path:'conseil',component:ConseilComponent},

{path:'salle',component:SalleComponent},
{path:'ajoutConseil',component:AjoutConsComponent},
{path:'modifierConseil/:id',component:ModifierConsComponent},
{path:'ajoutSalle',component:SalleComponent},
{path:'listSalle',component:ListSalleComponent},
{path:'council-management',component:CouncilManagementComponent},
{path:'utilisateur',component:UtilisateurComponent},
{path:'motpasseoublie',component:MotpasseComponent},
{path:'',redirectTo:'utilisateur',pathMatch:'full'} ,
{ path: 'reset-password', component:ResetPasswordComponent },
{ path: 'president', component:PresidentCoseilComponent },
{path:'enseignant-conseil',component:EnseignantConseilComponent},
{path:'session-conseil/:id',component:SessionConseilComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
