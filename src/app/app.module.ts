import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { FormsModule } from '@angular/forms';
import { UtenteService } from './core/services/utente.service';
import { SchedaUtentiComponent } from './admin/scheda-utenti/scheda-utenti.component';
import { RichiestaFerieFormComponent } from './user/richiesta-ferie-form/richiesta-ferie-form.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { AppRoutingModule } from './app-routing.module';
import { GestionePermessiComponent } from './approvazione_ferie/gestione-permessi/gestione-permessi.component';
import { ElencoPermessiComponent } from './uffPersonale/elenco-permessi/elenco-permessi.component';
import { AuthGuard } from './core/guards/auth.guard';
import { IMieiPermessiComponent } from './user/i-miei-permessi/i-miei-permessi.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeFerieComponent } from './approvazione_ferie/home-ferie/home-ferie.component';
import { ErrorComponent } from './error/error.component';
import { HomeUserComponent } from './user/home-user/home-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    //SchedaUtentiComponent,
    //NavbarAdminComponent,
    //HomeAdminComponent,
    RichiestaFerieFormComponent,
    ErrorComponent,
    //HomeUserComponent,
    //GestionePermessiComponent,
    //ElencoPermessiComponent,
    //HomeFerieComponent,
    //NavbarComponent,
    //IMieiPermessiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    UtenteService, //potrei anche commentarlo perchè in utenteservice c'è @injectable provided in root
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
