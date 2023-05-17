import { Component, Input, OnInit } from '@angular/core';
import { NavModel } from './nav.model';
import { LoginService } from 'src/app/login.service';
import { Utente } from 'src/app/core/models/utente';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  titlelink: string;

  @Input()
  navlinks: NavModel[] = [];
  public utenteLoggato: Utente;


  constructor(private loginService: LoginService) {
    this.title = "";
    this.titlelink = "";
    this.utenteLoggato = loginService.currentUserValue;

  }

  ngOnInit(): void {
  }

  public logout(){
    this.loginService.logout();
    console.log("logout");
  }
}
