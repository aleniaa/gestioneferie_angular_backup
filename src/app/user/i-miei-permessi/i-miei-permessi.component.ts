import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Permesso } from 'src/app/core/models/permesso';
import { Utente } from 'src/app/core/models/utente';
import { PermessoService } from 'src/app/core/services/permesso.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-i-miei-permessi',
  templateUrl: './i-miei-permessi.component.html',
  styleUrls: ['./i-miei-permessi.component.css']
})
export class IMieiPermessiComponent {
  public permessi: Permesso[] = [];
  public permessiPending: Permesso[] = [];
  public permessiApprovati: Permesso[] = [];
  public permessiRespinti: Permesso[] = [];
  public permessoSelezionato: Permesso;
  public permessoDaCancellare: Permesso;

  constructor(private permessoService: PermessoService, private loginService: LoginService){}

  ngOnInit()  {
    
    //this.getPermessi();
    //this.getPermessi();
    //this.getPermessiPending();
    this.getPermessiRichiedenteByStatus();
    //this.getUtenti();
  }

  public selezionaPermessoDaCancellare(permesso: Permesso): void{
      this.permessoDaCancellare = permesso;
      console.log("sono dentro seleziona permesso") ;
    const button = document.createElement('button');
    const container= document.getElementById('main-container');
    
    button.type= 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#eliminaPermessoModal');
    container?.appendChild(button);
    
    button.click();
  }

  public cancellaPermesso(permesso: Permesso): void{
    this.permessoService.cancellaPermesso(permesso.id).subscribe(
      (response: void) => { //jfoiewfjwoiej
        //console.log(response);
        //alert("Permesso cancellato");
        this.getPermessiRichiedenteByStatus();

        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
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
  
  public getPermessiRichiedenteByStatus(): void{

    //localStorage.getItem("currentUser")

      //const utente: Utente = this.loginService.currentUserValue;

      var values = JSON.parse(localStorage.getItem("currentUser"));
      var idUtenteApp = values.id; 

    this.permessoService.getPermessiRichiedenteByStatus(0, idUtenteApp).subscribe(
      (response: Permesso[]) => {
        this.permessiPending = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.permessoService.getPermessiRichiedenteByStatus(1, idUtenteApp).subscribe(
      (response: Permesso[]) => {
        this.permessiApprovati = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.permessoService.getPermessiRichiedenteByStatus(2, idUtenteApp).subscribe(
      (response: Permesso[]) => {
        this.permessiRespinti = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
