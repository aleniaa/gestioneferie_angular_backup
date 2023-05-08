import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Permesso } from 'src/app/core/models/permesso';
import { PermessoService } from 'src/app/core/services/permesso.service';

@Component({
  selector: 'app-elenco-permessi',
  templateUrl: './elenco-permessi.component.html',
  styleUrls: ['./elenco-permessi.component.css']
})
export class ElencoPermessiComponent implements OnInit{


  public permessi: Permesso[] = [];

  constructor(private permessoService: PermessoService) { }

  ngOnInit()  {
    
    //this.getPermessi();
    this.getPermessiCongedo();

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
