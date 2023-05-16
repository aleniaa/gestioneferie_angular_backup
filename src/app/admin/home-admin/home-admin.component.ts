import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavModel } from 'src/app/navbar/nav.model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  navbarlinks: NavModel[] = [];
  titlelink: string;

  constructor(private route: Router) {
    this.navbarlinks.push({ header: "Utenti", link: "users" });
    this.navbarlinks.push({ header: "Pazienti", link: "patients" });
    this.navbarlinks.push({ header: "Triage", link: "triages" });
    this.titlelink = "/admin/users";
  }

  ngOnInit(): void {
    this.route.navigate(['/admin/users']);
  }

}