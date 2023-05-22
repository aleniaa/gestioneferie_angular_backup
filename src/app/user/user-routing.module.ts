import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeUserComponent } from './home-user/home-user.component';
import { RichiestaFerieFormComponent } from './richiesta-ferie-form/richiesta-ferie-form.component';
import { IMieiPermessiComponent } from './i-miei-permessi/i-miei-permessi.component';

const routes: Routes = [
  {
    path: '',
    component: HomeUserComponent,
    children: [
      
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
export class UserRoutingModule { }
