import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { SchedaUtentiComponent } from './scheda-utenti/scheda-utenti.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeAdminComponent,
    SchedaUtentiComponent,
    NavbarAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule

  ]
})
export class AdminModule { }
