import { Component } from '@angular/core';

@Component({
  selector: 'app-richiesta-ferie-form',
  templateUrl: './richiesta-ferie-form.component.html',
  styleUrls: ['./richiesta-ferie-form.component.css']
})
export class RichiestaFerieFormComponent {

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
