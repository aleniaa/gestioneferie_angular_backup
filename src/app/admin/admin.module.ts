import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { SchedaUtentiComponent } from './scheda-utenti/scheda-utenti.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { IMieiPermessiComponent } from '../user/i-miei-permessi/i-miei-permessi.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeAdminComponent,
    SchedaUtentiComponent,
    NavbarAdminComponent,
    //IMieiPermessiComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminModule { }
