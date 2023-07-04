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
  public idUtenteApp: number;
  public selectedUtenteApprovazioneId: Utente;
  public selectedUtenteApprovazioneDueId: Utente;
  public tipo_malattia: string;


  constructor(private utenteService: UtenteService, private permessoService: PermessoService, private loginService: LoginService) {
    this.utenteLoggato = loginService.currentUserValue;
    console.log("utente loggato in ferie:");
    console.log(this.utenteLoggato);
    this.oreInizio = "";
    this.oreFine = "";
    this.totOre = "";
    this.dataFine = "";
    this.dataInizio = "";
    this.message = "";
    this.totOreGiorni = "";
    this.totGiorni=0;
    this.tipo_malattia="Malattia"


  }

  ngOnInit() {
    this.selectedOption = 'undefined';
    this.getUtentiFerie();
    var values = JSON.parse(localStorage.getItem("currentUser"));
    this.idUtenteApp = values.id;


  }

  malattia_radioButtonChanged(){
    console.log(this.tipo_malattia); // or perform any other action with the selected value

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

  public updateTotGiorni() {
    console.log(this.dataFine);

    if (this.dataInizio === null || this.dataFine === null) {
      this.totGiorni = 0;
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
    this.totGiorni = diffInDays;
    console.log(diffInDays);
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

  public aggiungiPermesso(permessoForm: NgForm): void {
    console.log("utente loggato in ferie:");


    console.log(this.idUtenteApp);
    this.permessoService.aggiungiPermesso(permessoForm.value).subscribe(
      (response: string) => {
        this.message = response;
        console.log(response);
        permessoForm.reset();
        this.error="";
        var values = JSON.parse(localStorage.getItem("currentUser"));
        this.idUtenteApp = values.id;


      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        this.error = error.error;
        //permessoForm.reset();
        var values = JSON.parse(localStorage.getItem("currentUser"));
        this.idUtenteApp = values.id;
      },
    );


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
    
  }



  public toggleForm(form: string): void {

    this.azzeraVariabili();
    var x = document.getElementById("ferie_form");
    var congedo = document.getElementById("congedo_form");
    //var permesso_breve = document.getElementById("permesso_breve_form");
    var recupero_ore = document.getElementById("recupero_ore_form");
    var permessi = document.getElementById("permessi_form");
    var malattia = document.getElementById("malattia_container");

    if (form === 'congedo') {
      //permesso_breve.style.display = "none";
      recupero_ore.style.display = "none";
      permessi.style.display = "none";
      malattia.style.display = "none";
      x.appendChild(congedo);
      congedo.style.display = "block";


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
