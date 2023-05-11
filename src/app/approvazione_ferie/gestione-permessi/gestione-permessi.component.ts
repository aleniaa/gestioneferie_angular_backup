import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Permesso } from 'src/app/core/models/permesso';
import { PermessoService } from 'src/app/core/services/permesso.service';
import { UtenteService } from 'src/app/core/services/utente.service';

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

  constructor(private permessoService: PermessoService, private utenteService: UtenteService) { }
 
  ngOnInit()  {
    
    //this.getPermessi();
    //this.getPermessi();
    //this.getPermessiPending();
    this.getPermessiByStatus();
    //this.getUtenti();
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


  public getPermessiByStatus(): void{
    this.permessoService.getPermessiByStatus(0).subscribe(
      (response: Permesso[]) => {
        this.permessiPending = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.permessoService.getPermessiByStatus(1).subscribe(
      (response: Permesso[]) => {
        this.permessiApprovati = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.permessoService.getPermessiByStatus(2).subscribe(
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
        this.getPermessiByStatus();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.getPermessiByStatus();
      },
    );
  }

}
