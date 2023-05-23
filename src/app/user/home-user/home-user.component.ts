import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavModel } from 'src/app/shared/navbar/nav.model';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit{
  navbarlinks: NavModel[] = [];
  titlelink: string;
 
  constructor(private route: Router) {
    this.navbarlinks.push({ header: "Richiedi permessi", link: "richiediPermessi" });
    this.navbarlinks.push({ header: "I miei permessi", link: "iMieiPermessi" });
    this.navbarlinks.push({ header: "Modifica password", link: "modificaPass" });

    this.titlelink = "/utente";
  }
  
  ngOnInit(): void {
  }
}
