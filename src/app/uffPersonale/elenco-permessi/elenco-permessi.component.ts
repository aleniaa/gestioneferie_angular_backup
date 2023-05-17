import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Permesso } from 'src/app/core/models/permesso';
import { Utente } from 'src/app/core/models/utente';
import { PermessoService } from 'src/app/core/services/permesso.service';
import { UtenteService } from 'src/app/core/services/utente.service';

@Component({
  selector: 'app-elenco-permessi',
  templateUrl: './elenco-permessi.component.html',
  styleUrls: ['./elenco-permessi.component.css']
})
export class ElencoPermessiComponent implements OnInit{


  public permessi: Permesso[] = [];
  public utenti: Utente[] = [];
  public utentiRichiedentiTrovati: Utente[] = [];
  public utentiApprovatoriTrovati: Utente[] = [];
  public utenteApprovatore: Utente;
  public utenteRichiedente: Utente;

  constructor(private permessoService: PermessoService, private utenteService: UtenteService) { }

  ngOnInit()  {
    
    //this.getPermessi();
    //this.getPermessiCongedo();
    this.getUtenti();
  }

  public search(searchForm: NgForm): void{
    
    this.permessoService.search(searchForm.value).subscribe(
      (response: Permesso[]) => {
        this.permessi = response;
        //searchForm.resetForm();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public selezionaUtenteRichiedente(utenteRichiedenteSelezionato: Utente): void {
    this.utenteRichiedente= utenteRichiedenteSelezionato;
    var inputValue = document.getElementById('idUtenteRichiedenteSelezionato');
    inputValue.setAttribute("value", utenteRichiedenteSelezionato.accountDipvvf);
    this.utentiRichiedentiTrovati= [];

  }

  public selezionaUtenteApprovatore(utenteApprovatoreSelezionato: Utente): void {
    this.utenteApprovatore= utenteApprovatoreSelezionato;
    var inputValue = document.getElementById('utenteApprovatoreSelezionato');
    inputValue.setAttribute("value", utenteApprovatoreSelezionato.accountDipvvf);
    this.utentiApprovatoriTrovati= [];

  }

  public cercaUtenteRichidente(key: string): void{
    
    const risultati: Utente[]=[];
    
    for(const utente of this.utenti){
      if(utente.nome.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
      || utente.cognome.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
      //|| utente.telefono.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
      ){

        risultati.push(utente);
        
      }
    }
    this.utentiRichiedentiTrovati= risultati;
    
    if(risultati.length===0 || !key) {
      if(key===""){
        this.utentiRichiedentiTrovati= [];
       
      }
      
    }
  }

    public cercaUtenteApprovatore(key: string): void{
      const risultatiApprovatori: Utente[]=[];
      for(const utente of this.utenti){
        if(utente.nome.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
        || utente.cognome.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
        //|| utente.telefono.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
        ){
          if(utente.ruolo.match("FERIE")){
            risultatiApprovatori.push(utente);
          }
          
        }
      }
      this.utentiApprovatoriTrovati= risultatiApprovatori;
      
      
      if( !key || risultatiApprovatori.length===0) {
        if(key===""){
          
          this.utentiApprovatoriTrovati= [];
        }
        
      }
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

  public getPermessiCongedo(): void {
    this.permessoService.getAllPermessiCongedo().subscribe(
      (response: Permesso[]) => {
        this.permessi = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
