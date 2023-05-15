import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Permesso } from 'src/app/core/models/permesso';
import { Utente } from 'src/app/core/models/utente';
import { PermessoService } from 'src/app/core/services/permesso.service';
import { UtenteService } from 'src/app/core/services/utente.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-richiesta-ferie-form',
  templateUrl: './richiesta-ferie-form.component.html',
  styleUrls: ['./richiesta-ferie-form.component.css']
})
export class RichiestaFerieFormComponent implements OnInit {

  public utentiFerie: Utente[] = [];
  public utenteLoggato: Utente;

  constructor(private utenteService: UtenteService, private permessoService: PermessoService, private loginService: LoginService) { 
    this.utenteLoggato = loginService.currentUserValue;
    console.log("utente loggato in ferie");
    console.log(this.utenteLoggato);

  }

  ngOnInit()  {
    
    this.getUtentiFerie();

  }

  public getUtentiFerie(): void{
    this.utenteService.getUtentiFerie().subscribe(
      (response: Utente[]) => {
        this.utentiFerie = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public aggiungiPermesso(permessoForm: NgForm): void{

    this.permessoService.aggiungiPermesso(permessoForm.value).subscribe(
      (response: Permesso) => { //jfoiewfjwoiej
        console.log(response);
        //permessoForm.reset();
        alert("Richiesta inviata correttamente");
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        //permessoForm.reset();
      },
    );

  }

  




public toggleForm(form: string): void{

  var x = document.getElementById("ferie_form");
  var congedo= document.getElementById("congedo_form");
  var permesso_breve= document.getElementById("permesso_breve_form");
  var recupero_ore= document.getElementById("recupero_ore_form"); 
  var permessi= document.getElementById("permessi_form"); 

  if(form === 'congedo' ){
    permesso_breve.style.display = "none";
    recupero_ore.style.display = "none";
    permessi.style.display = "none";
    x.appendChild(congedo);
    congedo.style.display = "block";
    

  }

  if(form === 'permesso_breve' ){
    recupero_ore.style.display = "none";
    permessi.style.display = "none";
    congedo.style.display = "none";
    x.appendChild(permesso_breve);
    permesso_breve.style.display = "block";
    
  }

   if(form === 'recupero_ore'){
    permesso_breve.style.display = "none";
    congedo.style.display = "none";
    permessi.style.display = "none";
    x.appendChild(recupero_ore);
    recupero_ore.style.display = "block";
   

  } 

  if(form === 'permessi' ){
    permesso_breve.style.display = "none";
    recupero_ore.style.display = "none";
    congedo.style.display = "none";
    x.appendChild(permessi);
    permessi.style.display = "block";
    
  }
}

}
