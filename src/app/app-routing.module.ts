import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedaUtentiComponent } from './admin/scheda-utenti/scheda-utenti.component';
import { RichiestaFerieFormComponent } from './user/richiesta-ferie-form/richiesta-ferie-form.component';
import { GestionePermessiComponent } from './approvazione_ferie/gestione-permessi/gestione-permessi.component';
import { ElencoPermessiComponent } from './uffPersonale/elenco-permessi/elenco-permessi.component';

const routes: Routes = [
  { path: 'scheda-utenti', component: SchedaUtentiComponent },
  { path: 'richiesta-ferie', component: RichiestaFerieFormComponent},
  { path: 'gestione-permessi', component: GestionePermessiComponent},
  { path: 'elenco-permessi', component: ElencoPermessiComponent}
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
