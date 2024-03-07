import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from 'src/app/core/models/utente';
import { LoginService } from 'src/app/login.service';
import { NavModel } from 'src/app/shared/navbar/nav.model';

@Component({
  selector: 'app-home-personale',
  templateUrl: './home-personale.component.html',
  styleUrls: ['./home-personale.component.css']
})
export class HomePersonaleComponent {

  navbarlinks: NavModel[] = [];
  titlelink: string;
  message: string;
 
  constructor(private route: Router, private loginService: LoginService) {
    this.navbarlinks.push({ header: "Ricerca permessi", link: "ricercaPermessi" });
    //this.navbarlinks.push({ header: "Richiedi permessi", link: "richiediPermessi" });
    //this.navbarlinks.push({ header: "I miei permessi", link: "iMieiPermessi" });
    this.navbarlinks.push({ header: "Modifica password", link: "modificaPass" });
    this.titlelink = "/personale/ricercaPermessi";
  }

  ngOnInit(): void {
    this.route.navigate(['/personale/ricercaPermessi']);
    this.checkPassword();
  }

  checkPassword(){
    const utente: Utente = this.loginService.currentUserValue;
    //console.log(utente.password);
    this.loginService.checkPassword(utente.password, utente.id).subscribe(
      (response: any) => { //jfoiewfjwoiej
        this.message=response.message;
        //console.log(this.message)
        if(this.message==="Password da cambiare"){
          alert("La tua password è quella di default, verrai reindirizzato alla pagina per modificarla.")
          this.route.navigate(['/personale/modificaPass']);
        }else{
          this.route.navigate(['/personale/ricercaPermessi']);

        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.error('HTTP request failed:', error.status, error.error);
      },
    );


  }
}
