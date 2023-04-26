import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedaUtentiComponent } from './admin/scheda-utenti/scheda-utenti.component';
import { RichiestaFerieFormComponent } from './user/richiesta-ferie-form/richiesta-ferie-form.component';

const routes: Routes = [
  { path: 'scheda-utenti', component: SchedaUtentiComponent },
  { path: 'richiesta-ferie', component: RichiestaFerieFormComponent}
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
