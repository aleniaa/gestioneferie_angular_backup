import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { navbarComponent } from './navbarComponent/navbar.component';
import { NavbarUserComponent } from './user/navbar-user/navbar-user.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { FormsModule } from '@angular/forms';
import { UtenteService } from './core/services/utente.service';
import { SchedaUtentiComponent } from './admin/scheda-utenti/scheda-utenti.component';
import { RichiestaFerieFormComponent } from './user/richiesta-ferie-form/richiesta-ferie-form.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    navbarComponent,
    NavbarUserComponent,
    LoginFormComponent,
    SchedaUtentiComponent,
    NavbarAdminComponent,
    HomeAdminComponent,
    RichiestaFerieFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    UtenteService //potrei anche commentarlo perchè in utenteservice c'è @injectable provided in root
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
