import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { MotpasseComponent } from './motpasse/motpasse.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [

{path:'dashboard',component:DashboardComponent},
{path:'utilisateur',component:UtilisateurComponent},
{path:'motpasseoublie',component:MotpasseComponent},
{path:'',redirectTo:'utilisateur',pathMatch:'full'} ,
{ path: 'reset-password', component:ResetPasswordComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
