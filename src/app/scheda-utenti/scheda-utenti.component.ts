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
  public deleteUtente!: Utente;

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

  public onOpenModal(utente: Utente, mode: string): void { //questo metodo serve ad aprire i modal in base ai click
    const button = document.createElement('button');
    const container= document.getElementById('main-container');
    
    button.type= 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');

    if(mode === 'add' ){
      button.setAttribute('data-target','#aggiungiUtenteModal');

    }

    if(mode === 'edit' ){
      this.modificaUtente = utente; //this vuol dire l'utente in questa classe
      button.setAttribute('data-target','#aggiornaUtenteModal');

    }
    if(mode === 'delete'){
      this.deleteUtente = utente;
      button.setAttribute('data-target','#cancellaUtenteModal');

    }
  
    container?.appendChild(button);
    
    button.click();


  }

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

  public cancellaUtente(utenteId: number): void{
    this.utenteService.cancellaUtente(utenteId).subscribe(
      (response: void) => { //jfoiewfjwoiej
        console.log(response);
        this.getUtenti();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    ); //addform.value è una rappresentaione json dei dati inseriti nel form
  }

  public cercaUtenti(key: string): void{
    const risultati: Utente[]=[];
    for(const utente of this.utenti){
      if(utente.nome.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
      || utente.cognome.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
      //|| utente.telefono.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
      ){
        risultati.push(utente);
      }
    }

    this.utenti= risultati;
/*      if((risultati.length===0 || !key) && key===""){
      this.getUtenti();
    }  */

    if(risultati.length===0 || !key) {
      if(key===""){
        this.getUtenti();
      }
      
    } 

  }

}
