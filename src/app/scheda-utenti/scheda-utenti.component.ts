import { Utente } from './../utente';
import { Component, OnInit } from '@angular/core';
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
  public modificaUtente!: Utente; //il punto esclamativo serve a non dover inizializzare la variabile per forza

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
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    ); //addform.value restituisce una rappresentaione json dei dati inseriti nel form
  }

  public onOpenModal(utente: Utente, mode: string): void { //questo metodo serve ad aprire i modal in base ai click
    const button = document.createElement('button');
    const container= document.getElementById('main-container');
    
    button.type= 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'edit'){
      this.modificaUtente = utente; //this vuol dire l'utente in questa classe
      button.setAttribute('data-target','#aggiornaUtenteModal');

    }
    if(mode === 'delete'){
      button.setAttribute('data-target','#cancellaUtenteModal');

    }

    container?.appendChild(button);
    
    button.click();


  }

  public onClickAggiungiUtente(): void {
    const button = document.createElement('button');
    const aggiungiUtenteButton = document.getElementById('aggiungiUtenteButton');
    button.type= 'button';
    button.className= "btn btn-primary";
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#aggiungiUtenteModal');
    aggiungiUtenteButton?.appendChild(button);
    button.click();


  }

  public aggiornaUtente(utente: Utente): void{
    this.utenteService.aggiornaUtente(utente).subscribe(
      (response: Utente) => { //jfoiewfjwoiej
        console.log(response);
        this.getUtenti();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    ); //addform.value è una rappresentaione json dei dati inseriti nel form
  }

}
