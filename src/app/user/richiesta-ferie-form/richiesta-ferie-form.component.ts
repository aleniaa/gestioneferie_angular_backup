import { Time } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Permesso } from 'src/app/core/models/permesso';
import { Utente } from 'src/app/core/models/utente';
import { PermessoService } from 'src/app/core/services/permesso.service';
import { UtenteService } from 'src/app/core/services/utente.service';
import { LoginService } from 'src/app/login.service';
import { Capoturno } from 'src/app/core/models/capoturno.enum';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-richiesta-ferie-form',
  templateUrl: './richiesta-ferie-form.component.html',
  styleUrls: ['./richiesta-ferie-form.component.css']
})
export class RichiestaFerieFormComponent implements OnInit {

  public funzionari: Utente[] = [];
  public capiturno: Utente[] = [];
  public utentiFerie: Utente[] = [];
  public utenteLoggato: Utente;
  public dataInizio: string;
  public dataFine: string;
  public oreInizio: string;
  public oreFine: string;
  public totOre: string;
  public totGiorni: number;
  public message: string;
  public error: string;
  public totOreGiorni: string
  selectedOption: string;
  public idUtenteLoggato: number;
  public selectedUtenteApprovazioneId: Utente;
  public selectedUtenteApprovazioneDueId: Utente;
  public tipo_malattia: string;
  public utentiFerieTrovati: Utente[]= [];
  public utenteFerie: Utente;
  public utenteFerieSelezionato: Utente;
  public infoUtenteFerie: string;
  public tipoPermesso: string;
  public key_messaggio: string ;
  public currentForm: string;
  

  constructor(private utenteService: UtenteService, private permessoService: PermessoService, private loginService: LoginService) {
    this.utenteLoggato = loginService.currentUserValue;
    //console.log("utente loggato in ferie:");
    //console.log(this.utenteLoggato);
    this.oreInizio = "";
    this.oreFine = "";
    this.totOre = "";
    this.dataFine = "";
    this.dataInizio = "";
    this.message = "";
    this.totOreGiorni = "";
    this.totGiorni=0;
    this.tipo_malattia="Malattia"
    this.key_messaggio= ""
    this.currentForm="congedo"

  }

  ngOnInit() {
    this.selectedOption = 'undefined';
    this.getUtentiFerie();
    var values = JSON.parse(localStorage.getItem("currentUser"));
    this.idUtenteLoggato = values.id;


  }

  malattia_radioButtonChanged(){
    
    //console.log(this.tipo_malattia); // or perform any other action with the selected value

  }

  public updateTotOre() {
    if (this.oreInizio === null || this.oreFine === null) {
      this.oreInizio = "";
      this.oreFine = "";
    }
    if (
      this.oreInizio.match("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$") &&
      this.oreFine.match("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
    ) {
      const [hours1, minutes1] = this.oreInizio.split(":");
      const [hours2, minutes2] = this.oreFine.split(":");

      const oreInizioD = new Date();
      oreInizioD.setHours(Number(hours1));
      oreInizioD.setMinutes(Number(minutes1));

      const oreFineD = new Date();
      oreFineD.setHours(Number(hours2));
      oreFineD.setMinutes(Number(minutes2));

      const differenceInMilliseconds = Math.abs(oreFineD.getTime() - oreInizioD.getTime());
      const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
      const differenceInHours = Math.floor(differenceInMinutes / 60);
      const remainingMinutes = differenceInMinutes % 60;

      this.totOre = differenceInHours + "h e " + remainingMinutes + " min";
      this.updateTotGiorni()
      if (this.totGiorni > 0) {
        const totalMinutes = (differenceInHours * 60) + remainingMinutes;
        const multipliedMinutes = totalMinutes * this.totGiorni;
        const multipliedHours = Math.floor(multipliedMinutes / 60);
        const remainingMultipliedMinutes = multipliedMinutes % 60;

        this.totOreGiorni = multipliedHours + "h e " + remainingMultipliedMinutes + " min";
      } else {
        this.totOreGiorni = "";
      }
    } else {
      this.totOre = "";
      this.totOreGiorni = "";
    }
  }

  public cercaApprovatoreFerie(key: string): void{
    //console.log(key)
    const risultati: Utente[]=[];
    this.key_messaggio=key;
    
    //if(key.match(qualifichejson.entries))
    
      for(const utenteFerie of this.utentiFerie){
        if(key)
          if(utenteFerie.nome.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
          || utenteFerie.cognome.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
          //|| utente.telefono.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
          ){

            risultati.push(utenteFerie);
            
          }
      }
      this.utentiFerieTrovati= risultati;
      // console.log(this.utentiFerieTrovati)
      // console.log(key)
      
      if(risultati.length===0 || !key) {
        if(key===""){
          this.utentiFerieTrovati= [];
          this.infoUtenteFerie=''
          //this.utentiFerieTrovati=null;
          //this.utente Richiedente= null;  così se l'utente cancella il richiedente alla prossima ricerca viene passato null
        }
        
      }
  }

  public selezionaUtenteFerie(utenteFerieSelezionato: Utente){
    this.utenteFerieSelezionato= utenteFerieSelezionato;
    console.log(this.utenteFerieSelezionato)
    this.infoUtenteFerie= this.utenteFerieSelezionato.nome+ " " + this.utenteFerieSelezionato.cognome;
    this.utentiFerieTrovati= [];
    this.key_messaggio=''
  }




  public updateTotGiorni() {
    //console.log(this.dataFine);

    if (this.dataInizio === null || this.dataFine === null) {
      
      this.dataInizio= ""
      this.dataFine=""
    }

    // Extract year, month, and day from the date strings
    const [year1, month1, day1] = this.dataInizio.split("-").map(Number);
    const [year2, month2, day2] = this.dataFine.split("-").map(Number);

    // Create Date objects
    const date1 = new Date(year1, month1 - 1, day1);
    const date2 = new Date(year2, month2 - 1, day2);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());

    // Convert milliseconds to days
    const diffInDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    if(diffInDays)
      this.totGiorni = diffInDays;
    //console.log(diffInDays);
  }

  public getUtentiFerie(): void {
    const values = Object.values(Capoturno);
    this.utenteService.getUtentiFerie().subscribe(
      (response: Utente[]) => {

        //se bisogna dividere gli utenti in funzionari e capiturno:
        // for(const utenteFerie of response){
        //   if(values.includes(utenteFerie.qualifica.nome as Capoturno)){
        //     this.capiturno.push(utenteFerie);
        //   }else{
        //     this.funzionari.push(utenteFerie);
        //   }


        // }

        this.utentiFerie = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  // public aggiungiPermesso(permessoForm: NgForm): void {
  //   console.log("utente loggato in aggiungi permesso richiesta ferie form component:");
  //   var tipoPermessoForm = permessoForm.value['tipoPermesso'];
  //   console.log(tipoPermessoForm)
  //   this.error="";
  //   this.message = "";
  //   console.log(this.idUtenteLoggato);
  //   this.permessoService.aggiungiPermesso(permessoForm.value, this.idUtenteLoggato).subscribe(
  //     (response: string) => {
  //       this.message = response;
  //       //console.log(response);
  //       this.tipoPermesso= tipoPermessoForm
  //       console.log(tipoPermessoForm)
  //       permessoForm.reset();
        
  //       console.log(tipoPermessoForm)
  //       //this.azzeraVariabili()
  //       //this.error="";
  //       var values = JSON.parse(localStorage.getItem("currentUser"));
  //       this.idUtenteLoggato = values.id;
  //       this.key_messaggio=""


  //     },
  //     (error: HttpErrorResponse) => {
  //       //alert(error.message);
  //       this.error = error.error;
  //       console.log(this.error)
  //       //this.message = "";
  //       //permessoForm.reset();
  //       var values = JSON.parse(localStorage.getItem("currentUser"));
  //       this.idUtenteLoggato = values.id;
  //     },
  //   );


  // }

  public aggiungiPermesso(permessoForm: NgForm): void {
    //console.log("utente loggato in aggiungi permesso richiesta ferie form component:");
    //var tipoPermessoForm = permessoForm.value['tipoPermesso'];
    //console.log(this.tipoPermesso);

    //permessoForm.controls['tipoPermesso'].setValue(this.tipoPermesso);
    var values = JSON.parse(localStorage.getItem("currentUser"));
    this.idUtenteLoggato = values.id;
    //console.log("ID dell'utente loggato:", this.idUtenteLoggato);
    //console.log(this.idUtenteLoggato);
    //permessoForm.controls['idUtenteRichiedente'].setValue(this.idUtenteLoggato);


    //console.log(this.tipoPermesso);
    this.error = "";
    this.message = "";
    
  
    // if(this.currentForm=='congedo'){
    //   permessoForm.controls['tipoPermesso'].setValue("Congedo Ordinario");
    // }

    // if(this.currentForm=='recupero_ore'){
    //   permessoForm.controls['tipoPermesso'].setValue("Recupero ore eccedenti");
    // }


    // if(this.currentForm=='malattia'){
    //   permessoForm.controls['tipoPermesso'].setValue(this.tipo_malattia);
    //   this.utenteFerieSelezionato.id== null;
    // }
    
    // console.log(permessoForm.value['tipoPermesso'])
    // console.log(permessoForm.value['idUtenteApprovazione'])

    //permessoForm.controls['idUtenteApprovazione'].setValue(this.utenteFerieSelezionato.id);





    this.permessoService.aggiungiPermesso(permessoForm.value, this.idUtenteLoggato)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.error = error.error;
          console.log(this.error);
          var values = JSON.parse(localStorage.getItem("currentUser"));
          this.idUtenteLoggato = values.id;
          return throwError(error);
        })
      )
      .subscribe((response: string) => {
        this.message = response;
        //this.tipoPermesso = tipoPermessoForm;
        //console.log(tipoPermessoForm);
        //permessoForm.reset();
        //console.log(tipoPermessoForm);
        var values = JSON.parse(localStorage.getItem("currentUser"));
        this.idUtenteLoggato = values.id;
        this.key_messaggio = "";
      });
  }


  public azzeraVariabili():void{
    this.oreInizio = "";
    this.oreFine = "";
    this.totOre = "";
    this.dataFine = "";
    this.dataInizio = "";
    this.message = "";
    this.error= "";
    this.totOreGiorni = "";
    this.totGiorni=0;
    this.tipo_malattia="Malattia"
    this.utenteFerie= null
    this.infoUtenteFerie=""
    this.key_messaggio=""
    
  }



  public toggleForm(form: string): void {
    this.azzeraVariabili();
    var x = document.getElementById("ferie_form");
    var congedo = document.getElementById("congedo_form");
    //var permesso_breve = document.getElementById("permesso_breve_form");
    var recupero_ore = document.getElementById("recupero_ore_form");
    var permessi = document.getElementById("permessi_form");
    var malattia = document.getElementById("malattia_container");
    this.currentForm=form

    if (form === 'congedo') {
      //permesso_breve.style.display = "none";
      recupero_ore.style.display = "none";
      permessi.style.display = "none";
      malattia.style.display = "none";
      x.appendChild(congedo);
      congedo.style.display = "block";
      this.tipoPermesso= "Congedo Ordinario"


    }

    // if (form === 'permesso_breve') {
    //   recupero_ore.style.display = "none";
    //   permessi.style.display = "none";
    //   congedo.style.display = "none";
    //   malattia.style.display = "none";
    //   x.appendChild(permesso_breve);
    //   permesso_breve.style.display = "block";

    // }

    if (form === 'recupero_ore') {
      //permesso_breve.style.display = "none";
      congedo.style.display = "none";
      permessi.style.display = "none";
      malattia.style.display = "none";
      x.appendChild(recupero_ore);
      recupero_ore.style.display = "block";
      this.tipoPermesso= "Recupero ore eccedenti"

    }

    if (form === 'permessi') {
      //permesso_breve.style.display = "none";
      recupero_ore.style.display = "none";
      congedo.style.display = "none";
      malattia.style.display = "none";
      x.appendChild(permessi);
      permessi.style.display = "block";

    }

    if (form === 'malattia') {
      //permesso_breve.style.display = "none";
      recupero_ore.style.display = "none";
      congedo.style.display = "none";
      permessi.style.display = "none";
      x.appendChild(malattia);
      malattia.style.display = "block";

    }

  }

}
