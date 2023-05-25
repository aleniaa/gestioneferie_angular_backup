import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Permesso } from 'src/app/core/models/permesso';
import { Utente } from 'src/app/core/models/utente';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { PermessoService } from 'src/app/core/services/permesso.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-i-miei-permessi',
  templateUrl: './i-miei-permessi.component.html',
  styleUrls: ['./i-miei-permessi.component.css']
})
export class IMieiPermessiComponent {
  public permessi: Permesso[] = [];
  public permessiPending: Permesso[] = [];
  public permessiApprovati: Permesso[] = [];
  public permessiRespinti: Permesso[] = [];
  public permessoSelezionato: Permesso;
  public permessoDaCancellare: Permesso;
  selectedFile: File;
  allegato: File[];

  constructor(private permessoService: PermessoService, private fileUploadService: FileUploadService){}

  ngOnInit()  {
    
    //this.getPermessi();
    //this.getPermessi();
    //this.getPermessiPending();
    this.getPermessiRichiedenteByStatus();
    //this.getUtenti();
  }

  public selezionaPermessoDaCancellare(permesso: Permesso): void{
      this.permessoDaCancellare = permesso;
      console.log("sono dentro seleziona permesso") ;
    const button = document.createElement('button');
    const container= document.getElementById('main-container');
    
    button.type= 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#eliminaPermessoModal');
    container?.appendChild(button);
    
    button.click();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

  }

  onVisualizzaAllegati(permesso: Permesso):void{
    this.permessoSelezionato = permesso;
    const button = document.createElement('button');
    const container= document.getElementById('main-container');
    
    button.type= 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#visualizzaAllegatiModal');
    container?.appendChild(button);
    
    button.click();

    
    this.fileUploadService.getFiles(this.permessoSelezionato.id).subscribe(
      (response: File[]) => {
        console.log(response);
        this.allegato= response;
        alert('file ricevuti');
      },
      (error: any) => {
        console.error(error);
        alert('errore');
      }
    );
  }


  // downloadFile(): void {

  //       const url = window.URL.createObjectURL(this.allegato);
  //       const a = document.createElement('a');
  //       document.body.appendChild(a);
  //       a.href = url;
  //       a.download = 'filename.ext'; // Set the desired filename
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //       a.remove();

  // }

  downloadFiles(): void {
    if (this.allegato && this.allegato.length > 0) {
      for (let i = 0; i < this.allegato.length; i++) {
        const file = this.allegato[i];
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = file.name; // Set the desired filename
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    } else {
      // Handle the case when allegato is empty or null
      console.error('No files to download');
    }
  }
  
  
  

  
  onUpload(): void {

    if (this.selectedFile) {
      console.log(this.selectedFile)
      this.fileUploadService.uploadFile(this.selectedFile, this.permessoSelezionato).subscribe(
        (response: any) => {
          console.log(response);
          alert('File uploaded successfully');
        },
        (error: any) => {
          console.error(error);
          alert('Failed to upload file');
        }
      );
    }
  }




  public cancellaPermesso(permesso: Permesso): void{
    this.permessoService.cancellaPermesso(permesso.id).subscribe(
      (response: void) => { //jfoiewfjwoiej
        //console.log(response);
        //alert("Permesso cancellato");
        this.getPermessiRichiedenteByStatus();

        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public visualizzaNote(permesso: Permesso):void{
    this.permessoSelezionato =permesso;
    
    console.log("sono dentro visulizza note") ;
    const button = document.createElement('button');
    const container= document.getElementById('main-container');
    
    button.type= 'button';
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#vediNote');
    container?.appendChild(button);
    
    button.click();
  }
  
  public getPermessiRichiedenteByStatus(): void{

    //localStorage.getItem("currentUser")

      //const utente: Utente = this.loginService.currentUserValue;

      var values = JSON.parse(localStorage.getItem("currentUser"));
      var idUtenteApp = values.id; 

    this.permessoService.getPermessiRichiedenteByStatus(0, idUtenteApp).subscribe(
      (response: Permesso[]) => {
        this.permessiPending = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.permessoService.getPermessiRichiedenteByStatus(1, idUtenteApp).subscribe(
      (response: Permesso[]) => {
        this.permessiApprovati = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    this.permessoService.getPermessiRichiedenteByStatus(2, idUtenteApp).subscribe(
      (response: Permesso[]) => {
        this.permessiRespinti = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
