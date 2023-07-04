import { Qualifica } from './../../core/models/qualifica';
import { Utente } from '../../core/models/utente';
import { Component, OnInit } from '@angular/core';
import { UtenteService } from '../../core/services/utente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { QualificaService } from 'src/app/core/services/qualifica.service';

@Component({
  selector: 'app-scheda-utenti',
  templateUrl: './scheda-utenti.component.html',
  styleUrls: ['./scheda-utenti.component.css']
})
export class SchedaUtentiComponent implements OnInit{
  nomeUtente: String = "";
  cognomeUtente: String = "";
  accountDipvvf: String ="";
  emailVigilfuoco: String= "";
  public utenti: Utente[] = [];
  public modificaUtente!: Utente; //il punto esclamativo serve a non dover inizializzare la variabile per forza
  public deleteUtente!: Utente;
  public qualifiche: Qualifica[] = [];
  public qualificheTrovate: Qualifica[] = [];
  public qualificaSelezionata!: Qualifica;
  public infoQualifica: string;
  public errorMsg: string;
  public message: string;

  constructor(private utenteService: UtenteService, private qualificaService: QualificaService) { 
    this.message = "";
  
  }

  ngOnInit()  {
    this.getUtenti();
    this.getQualifiche();
  }

  updateAccountDipvvf(){
    this.accountDipvvf = this.nomeUtente + "." + this.cognomeUtente;
    this.emailVigilfuoco = this.accountDipvvf + "@vigilfuoco.it";
  }

  updateEmailVigilfuoco(){
    this.emailVigilfuoco = this.accountDipvvf + "@vigilfuoco.it";
  }

  public getUtenti(): void {
    this.utenteService.getUtenti().subscribe(
      (response: Utente[]) => {
        this.utenti = response;
        console.log(response)
        
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
      this.infoQualifica= utente.qualifica.descrizione;
      this.qualificaSelezionata= utente.qualifica;
      button.setAttribute('data-target','#aggiornaUtenteModal');

    }
    if(mode === 'delete'){
      this.deleteUtente = utente;
      button.setAttribute('data-target','#cancellaUtenteModal');

    }
  
    container?.appendChild(button);
    
    button.click();


  }

  public onCloseModal(): void{
    console.log("onclosemodal")
    this.modificaUtente= null;
    this.infoQualifica="";
    this.qualificheTrovate= [];
    this.qualificaSelezionata=null;
  }

  public onCloseModalAdd(addForm: NgForm):void{
    addForm.reset();
    this.onCloseModal();
  }

  public onAggiungiUtente(addForm: NgForm): void{

    console.log("il form di aggiungi utente è:");
    console.log(addForm.value);

    //document.getElementById('aggiungiUtenteModal')?.click();
    this.utenteService.aggiungiUtente(addForm.value).subscribe(
      //(response: Utente) => { //jfoiewfjwoiej
      (response: string) => { //jfoiewfjwoiej
        this.message= response;
        console.log(response);
        this.getUtenti();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error)
        this.errorMsg=error.error;
        alert("La mail vigilfuoco o l'account Dipvvf sono già presenti nel database");
        //addForm.reset();
      },
    ); //addform.value restituisce una rappresentaione json dei dati inseriti nel form
  }



  public aggiornaUtente(utente: Utente): void{
    console.log("utente di aggiorna utente: ");
    console.log(utente);
    
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

  public getQualifiche(): void {
    this.qualificaService.getQualifiche().subscribe(
      (response: Qualifica[]) => {
        this.qualifiche = response;
        console.log(this.qualifiche)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public cercaQualifica(key: string): void{
    console.log(key)
    const risultati: Qualifica[]=[];
    
    for(const qualifica of this.qualifiche){
      
      if(qualifica.nome.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
      || qualifica.descrizione.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
      //|| utente.telefono.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
      ){

        risultati.push(qualifica);
        
      }
    }
    this.qualificheTrovate= risultati;
    
    
    if(risultati.length===0 || !key) {
      if(key===""){
        this.qualificheTrovate= [];
        this.qualificaSelezionata=null;
        //this.utenteRichiedente= null;  così se l'utente cancella il richiedente alla prossima ricerca viene passato null
      }
      
    }
  }

  public selezionaQualifica(qualificaSelezionata: Qualifica){
    this.qualificaSelezionata= qualificaSelezionata;
    this.infoQualifica= this.qualificaSelezionata.descrizione;
    this.qualificheTrovate= [];
  }

}
