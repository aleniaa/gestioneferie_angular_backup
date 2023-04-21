import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UtenteService } from './utente.service';
import { HttpClientModule } from '@angular/common/http';
import { navbarComponent } from './navbarComponent/navbar.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AggiungiUtenteFormComponent } from './aggiungi-utente-form/aggiungi-utente-form.component';
import { SchedaUtentiComponent } from './scheda-utenti/scheda-utenti.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    navbarComponent,
    NavbarUserComponent,
    LoginFormComponent,
    AggiungiUtenteFormComponent,
    SchedaUtentiComponent,
    NavbarAdminComponent,
    HomeAdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UtenteService //potrei anche commentarlo perchè in utenteservice c'è @injectable provided in root
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
