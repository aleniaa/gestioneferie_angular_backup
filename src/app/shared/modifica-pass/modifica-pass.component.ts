import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Utente } from 'src/app/core/models/utente';
import { UtenteService } from 'src/app/core/services/utente.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-modifica-pass',
  templateUrl: './modifica-pass.component.html',
  styleUrls: ['./modifica-pass.component.css']
})
export class ModificaPassComponent {
  utenteLoggato: Utente;
  oldPass: string;
  newPass: string;
  message:string;
  errorMessage:string;

  constructor(private utenteService: UtenteService, private loginService: LoginService){
    // this.oldPass="";
    // this.newPass= "";
    this.utenteLoggato= loginService.currentUserValue;

  }


  public modificaPass(changePassForm: NgForm){
    var idUtenteLoggato= this.utenteLoggato.id;
    var oldPassw= this.oldPass;
    var newPassw= this.newPass;

    this.utenteService.changePass(idUtenteLoggato, oldPassw, newPassw).subscribe(
      (response: string) => {
        changePassForm.reset();
        this.message=response;
        this.errorMessage="";

        
      },
      (error: any) => {
        changePassForm.reset();
        this.errorMessage=error?.error;
        this.message='';

      }
    );

  }

}
