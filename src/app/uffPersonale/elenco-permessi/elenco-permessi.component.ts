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
import { catchError, forkJoin, throwError } from 'rxjs';


@Component({
  selector: 'app-elenco-permessi',
  templateUrl: './elenco-permessi.component.html',
  styleUrls: ['./elenco-permessi.component.css'],
  providers: [DatePipe],
})
export class ElencoPermessiComponent implements OnInit {


  public permessi: Permesso[] = [];
  public permessiDaConfermare: Permesso[] = [];
  public permessiConfermati: Permesso[] = [];
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
  public dataAssenza: Date = null;
  activeTab: number = 1;




  constructor(private permessoService: PermessoService, private utenteService: UtenteService, private fileUploadService: FileUploadService) { }

  ngOnInit() {

    //this.getPermessi();
    //this.getPermessiCongedo();
    this.getUtenti();
    this.getPermessiDaConfermare()
    this.getPermessiConfermati()
  }

  openTab(tabNumber: number) {
    this.activeTab = tabNumber;
    this.getPermessiDaConfermare();

    this.getPermessiConfermati();
  }


  onVisualizzaAllegati(permesso: Permesso): void {
    this.permessoSelezionato = permesso;
    const button = document.createElement('button');
    const container = document.getElementById('main-container');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#visualizzaAllegatiModal');
    container?.appendChild(button);

    button.click();


    this.fileUploadService.getFiles(this.permessoSelezionato.id).subscribe(
      event => {
        //console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

    this.filenames = [];
  }

  onConfermaPermessoButton(permesso: Permesso): void {
    this.permessoSelezionato = permesso;
    const button = document.createElement('button');
    const container = document.getElementById('main-container');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#confermaPermessoModal');
    container?.appendChild(button);

    button.click();

  }

  public confermaPermesso(permesso: Permesso): void {
    var values = JSON.parse(localStorage.getItem("currentUser"));
    var idUtenteApp = values.id;
    console.log(idUtenteApp)
    this.permessoService.approvaPermessoPersonale(permesso).subscribe(
      (response: Permesso) => { //jfoiewfjwoiej
        console.log(response);
        //this.getPermessiApprovatoreByStatus();

        this.getPermessiDaConfermare();

        this.getPermessiConfermati();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        //this.getPermessiApprovatoreByStatus();
        this.getPermessiDaConfermare();

      },
    );


  }



  // define a function to download files
  onDownloadFile(filename: string): void {
    this.fileUploadService.download(filename, this.permessoSelezionato.id).subscribe(
      event => {
        //console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }



  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        //console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
          //console.log('Ho appena aggiunto un file a filenames');
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('Content-Disposition').split(';')[1].trim().substring(9)!,
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }));

        }
        this.fileStatus.status = 'done';
        break;
      default:
        //console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  //questo è il search originale senza i confermati e i da confermare, cambiare anche nell'html in caso
  // public search(searchForm: NgForm): void {
  //   var dataAssenzaStringa = "";
  //   if (this.dataAssenza) { // se non è null
  //     dataAssenzaStringa = this.dataAssenza.toString();
  //   }
  //   // console.log("data assenza stringa è:")
  //   // console.log(dataAssenzaStringa)
  //   // console.log(searchForm.value);
  //   this.permessoService.search(searchForm.value, dataAssenzaStringa).subscribe(
  //     (response: Permesso[]) => {
  //       this.permessi = response;
  //       //searchForm.resetForm();

  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )

  // }

  public searchConfermareOConfermati(searchForm: NgForm): void {
    this.permessiConfermati = []
    this.permessiDaConfermare = []
    var dataAssenzaStringa = "";
    if (this.dataAssenza) { // se non è null
      dataAssenzaStringa = this.dataAssenza.toString();
    }
    console.log("data assenza stringa è:")
    this.permessiDaConfermare = []
    // console.log(dataAssenzaStringa)
    // console.log(searchForm.value);
    // var status= 1;
    // if(this.activeTab==2)
    //   status=2

    //this.permessoService.search(searchForm.value, dataAssenzaStringa, status).subscribe(
    this.permessoService.search(searchForm.value, dataAssenzaStringa).subscribe(

      (response: Permesso[]) => {
        //console.log(response)
        for (const permessoTrovato of response) {
          //console.log(permessoTrovato)
          switch (permessoTrovato.status) {
            case 1: // permesso approvato dall'approvatore 1
              this.permessiDaConfermare.push(permessoTrovato);
              break;

            case 2: // permesso approvato dall'approvatore 2
              this.permessiDaConfermare.push(permessoTrovato);
              break;
            case 3: // malattia
              this.permessiDaConfermare.push(permessoTrovato);
              break;
            case 6: // permesso approvato dall'approvatore 1 + Uffpersonale
              this.permessiConfermati.push(permessoTrovato);
              break;
            case 8: // permesso approvato dall'approvatore 2 + Uffpersonale
              this.permessiConfermati.push(permessoTrovato);
              break;
          }

        }
        //this.permessi = response;
        //searchForm.resetForm();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  public selezionaUtenteRichiedente(utenteRichiedenteSelezionato: Utente): void {
    this.utenteRichiedente = utenteRichiedenteSelezionato;
    this.infoRichiedente = utenteRichiedenteSelezionato.nome + " " + utenteRichiedenteSelezionato.cognome;
    this.utentiRichiedentiTrovati = [];

  }

  public selezionaUtenteApprovatore(utenteApprovatoreSelezionato: Utente): void {
    this.utenteApprovatore = utenteApprovatoreSelezionato;
    this.infoApprovatore = utenteApprovatoreSelezionato.nome + " " + utenteApprovatoreSelezionato.cognome + " (" + utenteApprovatoreSelezionato.qualifica.nome + ")";
    this.utentiApprovatoriTrovati = [];

  }

  public cercaUtenteRichiedente(key: string): void {

    const risultati: Utente[] = [];
    //console.log(key)
    for (const utente of this.utenti) {
      if (key)
        if (utente.nome.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1
          || utente.cognome.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1
          //|| utente.telefono.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
        ) {

          risultati.push(utente);

        }
    }
    this.utentiRichiedentiTrovati = risultati;

    if (risultati.length === 0 || !key) {
      if (key === "") {
        this.utentiRichiedentiTrovati = [];
        this.utenteRichiedente = null; // così se l'utente cancella il richiedente alla prossima ricerca viene passato null

      }

    }
  }

  public cercaUtenteApprovatore(key: string): void {
    const risultatiApprovatori: Utente[] = [];
    for (const utente of this.utenti) {
      if (key)
        if (utente.nome.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1
          || utente.cognome.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1
          //|| utente.telefono.toLocaleLowerCase().indexOf(key.toLowerCase()) !==-1
        ) {
          if (utente.ruolo.match("FERIE")) {
            risultatiApprovatori.push(utente);
          }

        }
    }
    this.utentiApprovatoriTrovati = risultatiApprovatori;


    if (!key || risultatiApprovatori.length === 0) {
      if (key === "") {

        this.utentiApprovatoriTrovati = [];

        this.utenteApprovatore = null;

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
      // funzionante originale
  // public getPermessiDaConfermare(): void {

  //   //permessi approvati da approvatore 1

  //   this.permessoService.getPermessiByStatus(1).subscribe(
  //     (response: Permesso[]) => {
  //       this.permessiDaConfermare = response;
  //       console.log(this.permessiDaConfermare)

  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  //   //permessi approvati da approvatore 2
  //   this.permessoService.getPermessiByStatus(2).subscribe(
  //     (response: Permesso[]) => {
  //       this.permessiDaConfermare = this.permessiDaConfermare.concat(response);
  //       console.log(this.permessiDaConfermare)
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  //   //malattia
  //   this.permessoService.getPermessiByStatus(3).subscribe(
  //     (response: Permesso[]) => {
  //       this.permessiDaConfermare = this.permessiDaConfermare.concat(response);
  //       console.log(this.permessiDaConfermare)
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )

  // }

  public getPermessiDaConfermare(): void {

    forkJoin([
      this.permessoService.getPermessiByStatus(1),
      this.permessoService.getPermessiByStatus(2),
      this.permessoService.getPermessiByStatus(3)
    ])
      .pipe(
        catchError(error => {
          // Handle the error here
          console.error('Error fetching permissions:', error);
          // You can display an error message to the user
          // You can retry the requests
          return throwError(error); // Re-throw the error to propagate it further
        })
      ) 
      .subscribe(permissions => {
        // permissions will be an array containing individual Permesso objects
        this.permessiDaConfermare = permissions.reduce((acc, curr) => acc.concat(curr), []);
      });


  }

  public getPermessiConfermati(): void {

    this.permessoService.getPermessiByStatus(6).subscribe(
      (response: Permesso[]) => {

        this.permessiConfermati = response;
        //console.log(this.permessiConfermati) 
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

    this.permessoService.getPermessiByStatus(8).subscribe(
      (response: Permesso[]) => {
        this.permessiConfermati = this.permessiConfermati.concat(response)
        //console.log(this.permessiConfermati) 
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
