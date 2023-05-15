import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { SchedaUtentiComponent } from './scheda-utenti/scheda-utenti.component';
import { RichiestaFerieFormComponent } from '../user/richiesta-ferie-form/richiesta-ferie-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminComponent,
    children: [
      { path: 'gestioneUtenti', component: SchedaUtentiComponent },
      { path: 'richiediPermessi', component: RichiestaFerieFormComponent },

    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
