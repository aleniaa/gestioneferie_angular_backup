import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavModel } from 'src/app/shared/navbar/nav.model';

@Component({
  selector: 'app-home-personale',
  templateUrl: './home-personale.component.html',
  styleUrls: ['./home-personale.component.css']
})
export class HomePersonaleComponent {

  navbarlinks: NavModel[] = [];
  titlelink: string;
 
  constructor(private route: Router) {
    this.navbarlinks.push({ header: "Ricerca permessi", link: "ricercaPermessi" });
    this.navbarlinks.push({ header: "Richiedi permessi", link: "richiediPermessi" });
    this.navbarlinks.push({ header: "I miei permessi", link: "iMieiPermessi" });
    this.titlelink = "/personale/ricercaPermessi";
  }

  ngOnInit(): void {
    this.route.navigate(['/personale/ricercaPermessi']);
  }
}