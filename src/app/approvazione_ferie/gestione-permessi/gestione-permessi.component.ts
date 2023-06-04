import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  public permessoSelezionato: Permesso;
  public note: string;

  constructor(private permessoService: PermessoService, private utenteService: UtenteService, private loginService: LoginService) { 
    this.note="";
  }
 
  ngOnInit()  {
    
    //this.getPermessi();
    //this.getPermessi();
    //this.getPermessiPending();
    //this.getPermessiByStatus();
    //this.getUtenti();
    this.getPermessiApprovatoreByStatus();
  }

  public visualizzaNote(permesso: Permesso):void{
    this.permessoSelezionato =permesso;
    
    console.log("sono dentro visulizza note") ;
    const button = document.createElement('button');
    const container= document.getElementById('main-container');
    
    button.type= 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#vediNote');
    container?.appendChild(button);
    
    button.click();
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
    //const utente: Utente = this.loginService.currentUserValue;

    //var values = JSON.parse(sessionStorage.getItem("currentUser"));
    var values = JSON.parse(localStorage.getItem("currentUser"));

    var idUtenteApp = values.id; 
    console.log(idUtenteApp);

    this.permessoService.getPermessiApprovatoreByStatus(0, idUtenteApp).subscribe(
      (response: Permesso[]) => {
        this.permessiPending = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.permessoService.getPermessiApprovatoreByStatus(1, idUtenteApp).subscribe(
      (response: Permesso[]) => {
        this.permessiApprovati = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.permessoService.getPermessiApprovatoreByStatus(2, idUtenteApp).subscribe(
      (response: Permesso[]) => {
        this.permessiRespinti = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public approvaPermesso(permesso: Permesso): void{
    
      this.permessoService.approvaPermesso(permesso).subscribe(
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

  public respingiPermesso(){
    document.getElementById('respingiPermesso')?.click();
    console.log("le note sono:")
    console.log(this.note)
    this.permessoService.respingiPermesso(this.note, this.permessoSelezionato).subscribe(
      (response: Permesso) => { //jfoiewfjwoiej
        console.log(response);
        this.getPermessiApprovatoreByStatus();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.getPermessiApprovatoreByStatus();
      },
    );

      this.note="";

  }



  public onRespingiPermesso(permesso: Permesso):void {
    this.permessoSelezionato= permesso;
    const button = document.createElement('button');
    const container= document.getElementById('main-container');
    
    button.type= 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#respingiPermesso');
    container?.appendChild(button);
    
    button.click();
  }
}
