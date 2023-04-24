import { Component } from '@angular/core';

@Component({
  selector: 'app-richiesta-ferie-form',
  templateUrl: './richiesta-ferie-form.component.html',
  styleUrls: ['./richiesta-ferie-form.component.css']
})
export class RichiestaFerieFormComponent {

public toggleForm(form: string): void{

  var x = document.getElementById("permesso_form");

  if(form === 'congedo' ){
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

  }

  if(form === 'permesso_breve' ){
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

  }
  if(form === 'recupero_ore'){
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

  }
}

}
