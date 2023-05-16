import { GestionePermessiComponent } from './gestione-permessi/gestione-permessi.component';
import { HomeFerieComponent } from './home-ferie/home-ferie.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RichiestaFerieFormComponent } from '../user/richiesta-ferie-form/richiesta-ferie-form.component';
import { IMieiPermessiComponent } from '../user/i-miei-permessi/i-miei-permessi.component';

const routes: Routes = [
  {
    path: '',
    component: HomeFerieComponent,
    children: [
      { path: 'gestionePermessi', component: GestionePermessiComponent },
      { path: 'richiediPermessi', component: RichiestaFerieFormComponent },
      { path: 'iMieiPermessi', component: IMieiPermessiComponent },

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
export class FerieRoutingModule { }
