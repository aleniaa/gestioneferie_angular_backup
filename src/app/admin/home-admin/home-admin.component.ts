import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from 'src/app/core/models/utente';
import { LoginService } from 'src/app/login.service';
import { NavModel } from 'src/app/shared/navbar/nav.model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  navbarlinks: NavModel[] = [];
  titlelink: string;
  message: string;

  constructor(private route: Router, private loginService: LoginService) {
    this.navbarlinks.push({ header: "Gestione Utenti", link: "gestioneUtenti" });
    this.navbarlinks.push({ header: "Richiedi permessi", link: "richiediPermessi" });
    this.navbarlinks.push({ header: "I miei permessi", link: "iMieiPermessi" });
    this.navbarlinks.push({ header: "Modifica password", link: "modificaPass" });
    this.titlelink = "/admin/users";
    //this.route.navigate(['/admin/gestioneUtenti']);
  }

  ngOnInit(): void {
    //this.route.navigate(['/admin/gestioneUtenti']);
    this.checkPassword();
  }

  checkPassword(){
    const utente: Utente = this.loginService.currentUserValue;
    //console.log(utente.password);
    this.loginService.checkPassword(utente.password, utente.id).subscribe(
      (response: any) => { //jfoiewfjwoiej
        this.message=response.message;
        if(this.message==="Password da cambiare"){
          alert("La tua password è quella di default, verrai reindirizzato alla pagina per modificarla.")
          this.route.navigate(['/admin/modificaPass']);
        }else{
          this.route.navigate(['/admin/gestioneUtenti']);

        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.error('HTTP request failed:', error.status, error.error);
      },
    );


  }

}