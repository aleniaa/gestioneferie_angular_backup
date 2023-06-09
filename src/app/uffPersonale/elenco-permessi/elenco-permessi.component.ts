import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Permesso } from 'src/app/core/models/permesso';
import { Utente } from 'src/app/core/models/utente';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { PermessoService } from 'src/app/core/services/permesso.service';
import { UtenteService } from 'src/app/core/services/utente.service';
import { saveAs } from 'file-saver-es';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-elenco-permessi',
  templateUrl: './elenco-permessi.component.html',
  styleUrls: ['./elenco-permessi.component.css'],
  providers: [DatePipe],
})
export class ElencoPermessiComponent implements OnInit{


  public permessi: Permesso[] = [];
  public utenti: Utente[] = [];
  public utentiRichiedentiTrovati: Utente[] = [];
  public utentiApprovatoriTrovati: Utente[] = [];
  public utenteApprovatore: Utente;
  public utenteRichiedente: Utente;
  public infoRichiedente: string;
  public infoApprovatore: string;
  public permessoSelezionato: Permesso;
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  public dataAssenza: Date =null;


  

  constructor(private permessoService: PermessoService, private utenteService: UtenteService, private fileUploadService: FileUploadService) { }

  ngOnInit()  {
    
    //this.getPermessi();
    //this.getPermessiCongedo();
    this.getUtenti();
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
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

    this.filenames=[];
  }
  
  onDisplayFile(filename: string): void {
    // Assuming 'filename' is the URL of the file to be displayed
    window.open(filename, '_blank');
  }

      // define a function to download files
      onDownloadFile(filename: string): void {
        this.fileUploadService.download(filename, this.permessoSelezionato.id).subscribe(
          event => {
            console.log(event);
            this.resportProgress(event);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
          console.log('Ho appena aggiunto un file a filenames');
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('Content-Disposition').split(';')[1].trim().substring(9)!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));

        }
        this.fileStatus.status = 'done';
        break;
        default:
          console.log(httpEvent);
          break;
      
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  public search(searchForm: NgForm): void{
    var dataAssenzaStringa = "";
    if(this.dataAssenza){ // se non è null
      dataAssenzaStringa= this.dataAssenza.toString();
    }
    console.log("data assenza stringa è:")
    console.log(dataAssenzaStringa)
    console.log(searchForm.value);
    this.permessoService.search(searchForm.value, dataAssenzaStringa).subscribe(
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
    this.infoRichiedente= utenteRichiedenteSelezionato.nome + " " + utenteRichiedenteSelezionato.cognome;
    this.utentiRichiedentiTrovati= [];

  }

  public selezionaUtenteApprovatore(utenteApprovatoreSelezionato: Utente): void {
    this.utenteApprovatore= utenteApprovatoreSelezionato;
    this.infoApprovatore = utenteApprovatoreSelezionato.nome + " " + utenteApprovatoreSelezionato.cognome+" (" + utenteApprovatoreSelezionato.qualifica.nome+")";
    this.utentiApprovatoriTrovati= [];

  }

  public cercaUtenteRichiedente(key: string): void{
    
    const risultati: Utente[]=[];
    console.log(key)
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
        this.utenteRichiedente= null; // così se l'utente cancella il richiedente alla prossima ricerca viene passato null
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

          this.utenteApprovatore=null;

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
