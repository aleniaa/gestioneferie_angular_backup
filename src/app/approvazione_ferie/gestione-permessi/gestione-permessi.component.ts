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
  public utenteLoggato: Utente;
  public permessiApprovati: Permesso[] = [];
  public permessiRespinti: Permesso[] = [];
  public permessoSelezionato: Permesso;
  public note: string;
  activeTab: number = 1;

  constructor(private permessoService: PermessoService, private loginService: LoginService) { 
    this.note="";
    
    console.log(this.utenteLoggato)
  }

  openTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
 
  ngOnInit()  {
    
    //this.getPermessi();
    //this.getPermessi();
    //this.getPermessiPending();
    //this.getPermessiByStatus();
    //this.getUtenti();

    //this.getPermessiApprovatoreByStatus();
    
    
    //this.getPermessiApprovatore();
    this.getPermessiApprovatore2();
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


/*   public getPermessiApprovatoreByStatus(): void{
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
  } */


  public svuotaPermessi():void{
    this.permessiApprovati=[];
    this.permessiPending=[];
    this.permessiRespinti=[];

  }

  public getPermessiApprovatore(): void{
    this.svuotaPermessi();
    var values = JSON.parse(localStorage.getItem("currentUser"));
    var idUtenteApp = values.id; 
    console.log(idUtenteApp);
    this.permessoService.getPermessiApprovatore(idUtenteApp).subscribe(
      (response: Permesso[]) => {
        for(const permessoTrovato of response){
          switch(permessoTrovato.status){
            case 0:
 
              this.permessiPending.push(permessoTrovato);
            break;
            case 1: // permesso approvato attualmente solo dall'approvatore 1
              if(idUtenteApp===permessoTrovato.idUtenteApprovazione){ // è loggato l'approvatore 1 
                this.permessiApprovati.push(permessoTrovato);
              }else{
                this.permessiPending.push(permessoTrovato);
              }
            break;
            case 2: // permesso approvato attualmente solo dall'approvatore 2
              if(idUtenteApp===permessoTrovato.idUtenteApprovazione){ // è loggato l'approvatore 1 
                this.permessiPending.push(permessoTrovato);
              }else{ // se è loggato l'approvatore 2 
                this.permessiApprovati.push(permessoTrovato);
              }
            break;
            case 3: // permesso approvato da entrambi gli approvatori
              this.permessiApprovati.push(permessoTrovato);
            break
            case 4: // respinto da approvatore 1
              this.permessiRespinti.push(permessoTrovato);
            break;
            case 5: // respinto da approvatore 2
              this.permessiRespinti.push(permessoTrovato);
            break;
            default: console.log("qualcosa non va");
          }
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public getPermessiApprovatore2(): void{
    this.svuotaPermessi();
    var values = JSON.parse(localStorage.getItem("currentUser"));
    var idUtenteApp = values.id; 
    console.log(idUtenteApp);
    this.permessoService.getPermessiApprovatore(idUtenteApp).subscribe(
      (response: Permesso[]) => {
        for(const permessoTrovato of response){
          switch(permessoTrovato.status){
            case 0:
 
              this.permessiPending.push(permessoTrovato);
            break;
            case 1: // permesso approvato attualmente solo dall'approvatore 1
              if(idUtenteApp===permessoTrovato.idUtenteApprovazione){ // è loggato l'approvatore 1 
                this.permessiApprovati.push(permessoTrovato);
              }
              
            break;
            case 2: // permesso approvato attualmente solo dall'approvatore 2
              if(idUtenteApp===permessoTrovato.idUtenteApprovazione){ // è loggato l'approvatore 1 
                this.permessiPending.push(permessoTrovato);
              }
            break;
            case 4: // respinto da approvatore 1
              this.permessiRespinti.push(permessoTrovato);
            break;
            case 5: // respinto da approvatore 2
              this.permessiRespinti.push(permessoTrovato);
            break;
            default: console.log("qualcosa non va");
          }
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public approvaPermesso(permesso: Permesso): void{
      var values = JSON.parse(localStorage.getItem("currentUser"));
      var idUtenteApp = values.id; 
      console.log(idUtenteApp)
      this.permessoService.approvaPermesso(permesso, idUtenteApp).subscribe(
        (response: Permesso) => { //jfoiewfjwoiej
          console.log(response);
          //this.getPermessiApprovatoreByStatus();
          this.getPermessiApprovatore();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          //this.getPermessiApprovatoreByStatus();
          this.getPermessiApprovatore();

        },
      );
    
    
  }

//   public aggiornaPermesso(permesso: Permesso, statusPermesso: number): void{
//     var values = JSON.parse(localStorage.getItem("currentUser"));
//     var idUtenteApp = values.id; 
//     console.log(idUtenteApp)
//     this.permessoService.aggiornaPermesso(permesso, idUtenteApp, statusPermesso).subscribe(
//       (response: Permesso) => { //jfoiewfjwoiej
//         console.log(response);
//         //this.getPermessiApprovatoreByStatus();
//         this.getPermessiApprovatore();
//       },
//       (error: HttpErrorResponse) => {
//         alert(error.message);
//         //this.getPermessiApprovatoreByStatus();
//         this.getPermessiApprovatore();

//       },
//     );
  
// }

  public respingiPermesso(){
    document.getElementById('respingiPermesso')?.click();
    console.log("le note sono:")
    console.log(this.note)
    var values = JSON.parse(localStorage.getItem("currentUser"));
    var idUtenteApp = values.id; 
    this.permessoService.respingiPermesso(this.note, this.permessoSelezionato, idUtenteApp).subscribe(
      (response: Permesso) => { //jfoiewfjwoiej
        console.log(response);
        //this.getPermessiApprovatoreByStatus();
        this.getPermessiApprovatore();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        //this.getPermessiApprovatoreByStatus();
        this.getPermessiApprovatore();

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
