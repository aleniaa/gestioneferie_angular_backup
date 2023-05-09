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
  public utentiTrovati: Utente[] = [];

  constructor(private permessoService: PermessoService, private utenteService: UtenteService) { }

  ngOnInit()  {
    
    //this.getPermessi();
    this.getPermessiCongedo();
    this.getUtenti();
  }

  public search(searchForm: NgForm): void{
    
    this.permessoService.search(searchForm.value).subscribe(
      (response: Permesso[]) => {
        this.permessi = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public selezionaUtente(utenteSelezionato: Utente): void {
    var inputValue = document.getElementById('utenteSelezionato');
    inputValue.setAttribute("value", utenteSelezionato.accountDipvvf);
    

  }

  public cercaUtente(key: string): void{
    
    const risultati: Utente[]=[];
    for(const utente of this.utenti){
      if(utente.nome.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
      || utente.cognome.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
      //|| utente.telefono.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
      ){
        risultati.push(utente);
        
      }
    }

    this.utentiTrovati= risultati;
    
    if(risultati.length===0 || !key) {
      if(key===""){
        this.utentiTrovati= [];
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
