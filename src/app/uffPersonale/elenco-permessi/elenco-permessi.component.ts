import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Permesso } from 'src/app/core/models/permesso';
import { Utente } from 'src/app/core/models/utente';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { PermessoService } from 'src/app/core/services/permesso.service';
import { UtenteService } from 'src/app/core/services/utente.service';
import { saveAs } from 'file-saver-es';
import { DatePipe } from '@angular/common';
import { catchError, forkJoin, throwError } from 'rxjs';
import * as XLSX from 'xlsx';


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
  public permessiRespinti: Permesso[] = [];

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
  public dataApprovazione: Date = null;
  public tipoPermesso: string = "tutti i permessi";
  activeTab: number = 1;
  public note: string = "";

  permessiOrdinari: { value: string, label: string }[] = [
    { value: 'tutti i permessi', label: 'Tutti i permessi' },
    { value: 'congedo ordinario', label: 'Congedo ordinario' },
    { value: 'recupero ore eccedenti', label: 'Recupero ore eccedenti' },
    //{ value: 'altri permessi', label: 'Altri permessi' },
  ]

  malattie: { value: string, label: string }[] = [
    { value: 'Malattia', label: 'Malattia' },
    { value: 'Malattia per causa di servizio', label: 'Malattia per causa di servizio' },
    { value: 'Terapia salvavita', label: 'Terapia salvavita' },
    { value: 'Malattia COVID-19', label: 'Malattia COVID-19' },
  ]

  altriPermessi: { value: string, label: string }[] = [
    { value: 'Concorsi ed Esami', label: 'Concorsi ed Esami' },
    { value: 'Lutto Familiare', label: 'Lutto familiare' },
    { value: 'Gravi Infermita', label: 'Gravi infermità' },
    { value: 'Matrimonio', label: 'Matrimonio' },
    { value: 'Sport', label: 'Attività ginnico-sportiva' },
    { value: 'Motivi Personali', label: 'Motivi personali o familiari' },
    { value: 'Cure e terapie DLGS n.119', label: 'Malattia cure/terapie D.Lgs. n.119 del 18/07/2011' },
    { value: 'Visite e terapie', label: 'Malattia per visite, terapie, prestazioni specialistiche ed esami diagnostici' },
    { value: 'Donazione di sangue', label: 'Donazione Sangue' },
    { value: 'Studio', label: 'Motivi di studio ' },
    { value: 'Testimonianze', label: 'Testimonianze per motivi di servizio' },
    { value: 'Permesso Sindacale', label: 'Permesso sindacale' },
    { value: 'Cariche elettive', label: 'Cariche elettive' },
    { value: 'Permesso elezioni', label: 'Permesso per elezioni/referendum ' },
    { value: 'Assistenza disabili', label: 'Assistenza disabili' },
    { value: 'Permessi individuali', label: 'Permessi individuali' },
    { value: 'Prolungamento congedo parentale', label: 'Prolungamento del congedo parentale L.104/92 (Circ. n. 139 17/07/2015)' },
    { value: 'Congedo parentale', label: 'Congedo parentale' },
    { value: 'Riposi giornalieri', label: 'Riposi giornalieri' },
    { value: 'Infermità figlio', label: 'Congedo per malattia figlio/a' },
    { value: 'Allattamento', label: 'Permessi orari retribuiti per allattamento' },
    { value: 'Paternita', label: 'Congedo obbligatorio di paternità' },
    { value: 'Permesso breve', label: 'Permesso breve' }
  ];

  sortedAltriPermessi: { value: string, label: string }[] = []
  @ViewChild('table1') table1: ElementRef; // Reference for table in tab 1
  @ViewChild('table2') table2: ElementRef; // Reference for table in tab 2
  @ViewChild('table3') table3: ElementRef; 


  constructor(private permessoService: PermessoService, private utenteService: UtenteService, private fileUploadService: FileUploadService) { }

  ngOnInit() {


    this.getUtenti();
    this.getPermessi()
    this.ordinaAltripermessi()
  }

  exportTableToExcel() {
    let table: HTMLTableElement;
    let fileName: string;
    console.log(this.activeTab)
    switch (this.activeTab) {
      case 1:
        table = this.table1.nativeElement;
        fileName = 'permessi_da_confermare.xlsx';
        break;
      case 2:
        table = this.table2.nativeElement;
        fileName = 'permessi_confermati.xlsx';
        break;
      case 3:
        table = this.table3.nativeElement;
        fileName = 'permessi_respinti.xlsx';
        break;
      default:
        return;
    }

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }

  


  ordinaAltripermessi() {
    this.sortedAltriPermessi = this.altriPermessi.sort((a, b) => {
      const aLabel = a.label.toLowerCase();
      const bLabel = b.label.toLowerCase();
      return aLabel < bLabel ? -1 : aLabel > bLabel ? 1 : 0;
    });
  }

  selectSubmenuItem(item: string) {
    this.tipoPermesso = item
    this.showPermessi()
  }

  showPermessi() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  openTab(tabNumber: number) {
    this.activeTab = tabNumber;
    // this.getPermessiDaConfermare();

    // this.getPermessiConfermati();
  }

  resettaCampiSearchForm() {
    this.tipoPermesso = "tutti i permessi"
    this.utenteRichiedente = null
    this.infoApprovatore = null
    this.infoRichiedente = null
    this.utenteApprovatore = null
    this.dataApprovazione = null
    this.dataAssenza = null
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

  onRespingiPermessoButton(permesso: Permesso): void {
    this.permessoSelezionato = permesso;
    const button = document.createElement('button');
    const container = document.getElementById('main-container');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#respingiPermessoModal');
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

        this.getPermessi()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        //this.getPermessiApprovatoreByStatus();
        this.getPermessi()
      },
    );


  }

  public respingiPermesso() {
    document.getElementById('respingiPermessoModal')?.click();
    console.log("le note sono:")
    console.log(this.note)
    var values = JSON.parse(localStorage.getItem("currentUser"));
    var idUtenteApp = values.id;
    this.permessoService.respingiPermessoPersonale(this.note, this.permessoSelezionato, idUtenteApp).subscribe(
      (response: Permesso) => { //jfoiewfjwoiej
        console.log(response);
        //this.getPermessiApprovatoreByStatus();
        //this.getPermessiApprovatore2();
        this.getPermessi()

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        //this.getPermessiApprovatoreByStatus();
        //this.getPermessiApprovatore2();
        this.getPermessi()
      },
    );

    this.note = "";

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

  //------------------ NON MODIFICARE ----------------


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

  //------------------ NON MODIFICARE ----------------

  public svuotaPermessi() {
    this.permessiConfermati = []
    this.permessiDaConfermare = []
    this.permessiRespinti = []
  }

  public searchConfermareOConfermatiNew(): void {
    this.svuotaPermessi()
    var dataAssenzaStringa = "";
    var dataApprovazioneStringa = "";
    var idUtenteRichiedente = -1
    var idUtenteApprovatore = -1
    if (this.dataAssenza) { // se non è null
      dataAssenzaStringa = this.dataAssenza.toString();
    }
    if (this.dataApprovazione) { // se non è null
      dataApprovazioneStringa = this.dataApprovazione.toString();
    }
    console.log("data assenza stringa è:")

    if (this.utenteRichiedente) {
      idUtenteRichiedente = this.utenteRichiedente.id
    }

    if (this.utenteApprovatore) {
      idUtenteApprovatore = this.utenteApprovatore.id
    }

    // if(this.tipoPermesso){
    //   var tipoPermesso= this.tipoPermesso
    // }

    // idUtenteRichiedente= this.utenteRichiedente.id
    // idUtenteApprovatore= this.utenteApprovatore.id

    // dataAssenzaStringa= "ciao"
    // idUtenteRichiedente= 123345
    // idUtenteApprovatore =786878

    //this.permessoService.searchProva(searchForm.value,dataAssenzaStringa).subscribe(
    this.permessoService.searchPermessoNew(dataAssenzaStringa, this.tipoPermesso, idUtenteRichiedente, dataApprovazioneStringa, idUtenteApprovatore).subscribe(

      (response: Permesso[]) => {
        //console.log(response)
        for (const permessoTrovato of response) {
          //console.log(permessoTrovato)
          switch (permessoTrovato.status) {
            case 1: // permesso approvato dall'approvatore 1
              this.permessiDaConfermare.push(permessoTrovato);
              break;

            case 2: // permesso approvato dall'approvatore 2 e dall'approvatore 1
              this.permessiDaConfermare.push(permessoTrovato);
              break;
            case 3: // malattia
              this.permessiDaConfermare.push(permessoTrovato);
              break;
            case 6: // permesso approvato dall'approvatore 1 + Uffpersonale
              this.permessiConfermati.push(permessoTrovato);
              break;
            case 7: // permesso respinto da personale ma approvato dall'approvatore 1
              this.permessiRespinti.push(permessoTrovato);
              break;
            case 8: // permesso approvato dall'approvatore 2 e 1 + Uffpersonale
              this.permessiConfermati.push(permessoTrovato);
              break;
            case 9: // permesso respinto da personale ma approvato dall'approvatore 2
              this.permessiRespinti.push(permessoTrovato);
              break; 
            case 30: // malattia respinta da personale
              this.permessiRespinti.push(permessoTrovato);
              break;  
            case 31: // malattia approvata da personale
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
    this.getUtenti();
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
    this.getPermessiDaConfermare()
    this.getPermessiConfermati()
    this.getPermessiRespinti()
    // this.permessoService.getAllPermessi().subscribe(
    //   (response: Permesso[]) => {
    //     this.permessi = response;
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // )
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
    this.resettaCampiSearchForm()
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
        console.log(this.permessiDaConfermare)
      });


  }

  public getPermessiRespinti(): void {
    this.resettaCampiSearchForm()
    forkJoin([
      this.permessoService.getPermessiByStatus(7), //respinto da personale ma approvato da app 1
      this.permessoService.getPermessiByStatus(9), //respinto da personale ma approvato da app 2
      this.permessoService.getPermessiByStatus(30) //malattia respinta da personale
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
        this.permessiRespinti = permissions.reduce((acc, curr) => acc.concat(curr), []);
        //console.log( this.permessiDaConfermare)
      });


  }

  //VECCHIO
  // public getPermessiConfermati(): void {

  //   this.permessoService.getPermessiByStatus(6).subscribe(
  //     (response: Permesso[]) => {

  //       this.permessiConfermati = response;
  //       //console.log(this.permessiConfermati) 
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )

  //   this.permessoService.getPermessiByStatus(8).subscribe(
  //     (response: Permesso[]) => {
  //       this.permessiConfermati = this.permessiConfermati.concat(response)
  //       //console.log(this.permessiConfermati) 
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )

  // }

  public getPermessiConfermati(): void {
    this.resettaCampiSearchForm()

    forkJoin([
      this.permessoService.getPermessiByStatus(6),
      this.permessoService.getPermessiByStatus(8),
      this.permessoService.getPermessiByStatus(31)
    ])
      .pipe(
        catchError(error => {
          // Handle the error here
          console.error('Error fetching confirmed permissions:', error);
          // You can display an error message to the user
          // You can retry the requests
          return throwError(error); // Re-throw the error to propagate it further
        })
      )
      .subscribe(permissions => {
        // Combine fetched permissions
        this.permessiConfermati = permissions.reduce((acc, curr) => acc.concat(curr), []);
      });
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

  public visualizzaNote(permesso: Permesso): void {
    this.permessoSelezionato = permesso;

    //console.log("sono dentro visulizza note");
    const button = document.createElement('button');
    const container = document.getElementById('main-container');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#vediNote');
    container?.appendChild(button);

    button.click();
  }
}
