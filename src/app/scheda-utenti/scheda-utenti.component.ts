import { Component, OnInit } from '@angular/core';
import { Utente } from '../utente';
import { UtenteService } from '../utente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-scheda-utenti',
  templateUrl: './scheda-utenti.component.html',
  styleUrls: ['./scheda-utenti.component.css']
})
export class SchedaUtentiComponent implements OnInit{
  
  public utenti: Utente[] = [];

  constructor(private utenteService: UtenteService) { }

  ngOnInit()  {
    
    this.getUtenti();

  }

  public getUtenti(): void {
    this.utenteService.getUtenti().subscribe(
      (response: Utente[]) => {
        this.utenti = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

/*   public findUtente(): void{
    this.utenteService.trovaUtente().subscribe(

      (response: Utente[])=>{this.utenti = response;}
    ,

    ) 
    
  }*/

  public onAggiungiUtente(addForm: NgForm): void{
    document.getElementById('add-employee-form')?.click();
    this.utenteService.aggiungiUtente(addForm.value).subscribe(
      (response: Utente) => { //jfoiewfjwoiej
        console.log(response);
        this.getUtenti();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    ); //addform.value è una rappresentaione json dei dati inseriti nel form
  }

  public onOpenModal(utente: Utente, mode: string): void {
    const button = document.createElement('button');
    const container= document.getElementById('main-container');
    const containerAdd = document.getElementById('containerAdd');
    button.type= 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#aggiungiUtenteModal');

    }
    if(mode === 'edit'){
      button.setAttribute('data-target','#aggiornaUtenteModal');

    }
    if(mode === 'delete'){
      button.setAttribute('data-target','#cancellaUtenteModal');

    }

    container?.appendChild(button);
    containerAdd?.appendChild(button);
    button.click();


  }

}
