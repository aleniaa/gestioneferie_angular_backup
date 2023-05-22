import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedaUtentiComponent } from './admin/scheda-utenti/scheda-utenti.component';
import { RichiestaFerieFormComponent } from './user/richiesta-ferie-form/richiesta-ferie-form.component';
import { GestionePermessiComponent } from './approvazione_ferie/gestione-permessi/gestione-permessi.component';
import { ElencoPermessiComponent } from './uffPersonale/elenco-permessi/elenco-permessi.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ErrorComponent } from './error/error.component';
import { Role } from './core/models/Role';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate : [AuthGuard], data: { roles: [Role.Admin] }},
  { path: 'ferie', loadChildren: () => import('./approvazione_ferie/ferie.module').then(m => m.FerieModule), canActivate : [AuthGuard], data: { roles: [Role.Ferie] }},
  { path: 'personale', loadChildren: () => import('./uffPersonale/uff-personale.module').then(m => m.UffPersonaleModule), canActivate : [AuthGuard],data: { roles: [Role.Personale] }},
  { path: 'utente', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate : [AuthGuard], data: { roles: [Role.Utente] }},

  // { path: 'scheda-utenti', component: SchedaUtentiComponent },
  // { path: 'richiesta-ferie', component: RichiestaFerieFormComponent},
  // { path: 'gestione-permessi', component: GestionePermessiComponent},
  // { path: 'elenco-permessi', component: ElencoPermessiComponent},
  { path: '**', component: ErrorComponent  },

];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
