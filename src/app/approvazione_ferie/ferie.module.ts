import { FerieRoutingModule } from './ferie-routing.module';
import { GestionePermessiComponent } from './gestione-permessi/gestione-permessi.component';
import { IMieiPermessiComponent } from './../user/i-miei-permessi/i-miei-permessi.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeFerieComponent } from './home-ferie/home-ferie.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeFerieComponent,
    //NavbarComponent,
    IMieiPermessiComponent,
    GestionePermessiComponent
  ],
  imports: [
    CommonModule,
    FerieRoutingModule,
    FormsModule
  ]
})
export class FerieModule { }
