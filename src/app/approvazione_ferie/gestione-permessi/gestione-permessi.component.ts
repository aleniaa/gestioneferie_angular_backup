import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Permesso } from 'src/app/core/models/permesso';
import { Utente } from 'src/app/core/models/utente';
import { PermessoService } from 'src/app/core/services/permesso.service';
import { UtenteService } from 'src/app/core/services/utente.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-gestione-permessi',
  templateUrl: './gestione-permessi.component.html',
  styleUrls: ['./gestione-permessi.component.css']
})
export class GestionePermessiComponent implements OnInit {

  public permessi: Permesso[] = [];
  public permessiPending: Permesso[] = [];
  public permessiApprovati: Permesso[] = [];
  public permessiRespinti: Permesso[] = [];
  //public permesso: Permesso;

  constructor(private permessoService: PermessoService, private utenteService: UtenteService, private loginService: LoginService) { }
 
  ngOnInit()  {
    
    //this.getPermessi();
    //this.getPermessi();
    //this.getPermessiPending();
    //this.getPermessiByStatus();
    //this.getUtenti();
    this.getPermessiApprovatoreByStatus();
  }

  
  public getPermessi(): void {
    this.permessoService.getAllPermessi().subscribe(
      (response: Permesso[]) => {
        this.permessi = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public getPermessiApprovatoreByStatus(): void{
    const utente: Utente = this.loginService.currentUserValue;

    this.permessoService.getPermessiApprovatoreByStatus(0, utente.id).subscribe(
      (response: Permesso[]) => {
        this.permessiPending = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.permessoService.getPermessiApprovatoreByStatus(1, utente.id).subscribe(
      (response: Permesso[]) => {
        this.permessiApprovati = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.permessoService.getPermessiApprovatoreByStatus(2, utente.id).subscribe(
      (response: Permesso[]) => {
        this.permessiRespinti = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public conferma(decisione: string, permesso: Permesso): void{
    console.log("sono dentro conferma");
    this.permessoService.changeStatus(decisione, permesso).subscribe(
      (response: Permesso) => { //jfoiewfjwoiej
        console.log(response);
        this.getPermessiApprovatoreByStatus();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.getPermessiApprovatoreByStatus();
      },
    );
  }

}
