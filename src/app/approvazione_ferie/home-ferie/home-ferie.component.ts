import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from 'src/app/core/models/utente';
import { LoginService } from 'src/app/login.service';
import { NavModel } from 'src/app/shared/navbar/nav.model';

@Component({
  selector: 'app-home-ferie',
  templateUrl: './home-ferie.component.html',
  styleUrls: ['./home-ferie.component.css']
})
export class HomeFerieComponent implements OnInit{

  navbarlinks: NavModel[] = [];
  titlelink: string;
  message: string;

  constructor(private route: Router, private loginService: LoginService) {
    this.navbarlinks.push({ header: "Gestione permessi", link: "gestionePermessi" });
    this.navbarlinks.push({ header: "Richiedi permessi", link: "richiediPermessi" });
    this.navbarlinks.push({ header: "I miei permessi", link: "iMieiPermessi" });
    //this.navbarlinks.push({ header: "Modifica password", link: "modificaPass" });
    this.titlelink = "/ferie/gestionePermessi";
  }
  
  ngOnInit(): void {
    this.route.navigate(['/ferie/gestionePermessi']);
    //this.checkPassword();
  }

  // serve per sapere se la password è quella impostata dall'admin o è stata cambiata ma con accesso ldap non serve
  checkPassword(){
    const utente: Utente = this.loginService.currentUserValue;
    //console.log(utente.password);
    this.loginService.checkPassword(utente.password, utente.id).subscribe(
      (response: any) => { //jfoiewfjwoiej
        this.message=response.message;
        //console.log(this.message)
                // --- da decommentare se il login non si fa con ldap dipvvf.it ufficilale
        // if(this.message==="Password da cambiare"){
        //   alert("La tua password è quella di default, verrai reindirizzato alla pagina per modificarla.")
        //   this.route.navigate(['/ferie/modificaPass']);
        // }else{
        //   this.route.navigate(['/ferie/gestionePermessi']);

        // }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.error('HTTP request failed:', error.status, error.error);
      },
    );


  }
  
}
