import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePersonaleComponent } from './home-personale/home-personale.component';
import { RichiestaFerieFormComponent } from '../user/richiesta-ferie-form/richiesta-ferie-form.component';
import { IMieiPermessiComponent } from '../user/i-miei-permessi/i-miei-permessi.component';
import { ElencoPermessiComponent } from './elenco-permessi/elenco-permessi.component';


const routes: Routes = [
  {
    path: '',
    component: HomePersonaleComponent,
    children: [
      { path: 'ricercaPermessi', component: ElencoPermessiComponent },
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
export class UffPersonaleRoutingModule { }
