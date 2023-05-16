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

  constructor(private permessoService: PermessoService, private loginService: LoginService){}

  ngOnInit()  {
    
    //this.getPermessi();
    //this.getPermessi();
    //this.getPermessiPending();
    this.getPermessiRichiedenteByStatus();
    //this.getUtenti();
  }
  
  public getPermessiRichiedenteByStatus(): void{

    //localStorage.getItem("currentUser")

      const utente: Utente = this.loginService.currentUserValue;
      console.log("l'utente corrente da getcurrent user è:");
      console.log(utente);
    this.permessoService.getPermessiRichiedenteByStatus(0, utente.id).subscribe(
      (response: Permesso[]) => {
        this.permessiPending = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.permessoService.getPermessiRichiedenteByStatus(1, utente.id).subscribe(
      (response: Permesso[]) => {
        this.permessiApprovati = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.permessoService.getPermessiRichiedenteByStatus(2, utente.id).subscribe(
      (response: Permesso[]) => {
        this.permessiRespinti = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
