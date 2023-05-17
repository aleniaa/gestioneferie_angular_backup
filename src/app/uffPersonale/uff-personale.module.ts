import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UffPersonaleRoutingModule } from './uff-personale-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomePersonaleComponent } from './home-personale/home-personale.component';
import { IMieiPermessiComponent } from '../user/i-miei-permessi/i-miei-permessi.component';
import { ElencoPermessiComponent } from './elenco-permessi/elenco-permessi.component';



@NgModule({
  declarations: [
  HomePersonaleComponent,
  //IMieiPermessiComponent,
  ElencoPermessiComponent
  ],
  imports: [
    CommonModule,
    UffPersonaleRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class UffPersonaleModule { }
