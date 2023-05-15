import { Component } from '@angular/core';
import { Utente } from 'src/app/core/models/utente';
import { UtenteService } from 'src/app/core/services/utente.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {

  public utenteLoggato: Utente;

  constructor(private loginService: LoginService) { 
    this.utenteLoggato = loginService.currentUserValue;
  }

}
