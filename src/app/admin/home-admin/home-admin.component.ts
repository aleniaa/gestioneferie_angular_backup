import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavModel } from 'src/app/shared/navbar/nav.model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  navbarlinks: NavModel[] = [];
  titlelink: string;

  constructor(private route: Router) {
    this.navbarlinks.push({ header: "Gestione Utenti", link: "gestioneUtenti" });
    this.navbarlinks.push({ header: "Richiedi permessi", link: "richiediPermessi" });
    this.navbarlinks.push({ header: "I miei permessi", link: "iMieiPermessi" });
    this.navbarlinks.push({ header: "Modifica password", link: "modificaPass" });
    this.titlelink = "/admin/users";
    //this.route.navigate(['/admin/gestioneUtenti']);
  }

  ngOnInit(): void {
    //this.route.navigate(['/admin/gestioneUtenti']);
  }

}