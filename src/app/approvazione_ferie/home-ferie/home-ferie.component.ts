import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavModel } from 'src/app/shared/navbar/nav.model';

@Component({
  selector: 'app-home-ferie',
  templateUrl: './home-ferie.component.html',
  styleUrls: ['./home-ferie.component.css']
})
export class HomeFerieComponent implements OnInit{

  navbarlinks: NavModel[] = [];
  titlelink: string;

  constructor(private route: Router) {
    this.navbarlinks.push({ header: "Approva permessi", link: "gestionePermessi" });
    this.navbarlinks.push({ header: "Richiedi permessi", link: "richiediPermessi" });
    this.navbarlinks.push({ header: "I miei permessi", link: "iMieiPermessi" });
    this.navbarlinks.push({ header: "Modifica password", link: "modificaPass" });
    this.titlelink = "/ferie/gestionePermessi";
  }
  
  ngOnInit(): void {
    this.route.navigate(['/ferie/gestionePermessi']);
  }
}
