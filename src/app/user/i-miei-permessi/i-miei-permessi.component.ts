import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Permesso } from 'src/app/core/models/permesso';
import { Utente } from 'src/app/core/models/utente';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { PermessoService } from 'src/app/core/services/permesso.service';
import { LoginService } from 'src/app/login.service';
import { saveAs } from 'file-saver-es';

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
  public malattia: Permesso[] = [];
  selectedFile: File[];
  allegato: File[];
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  @ViewChild('fileForm') fileInputRef!: ElementRef<HTMLInputElement>;
  public message: string;
  public error: string;

  activeTab: number = 1;

  constructor(private permessoService: PermessoService, private fileUploadService: FileUploadService) {
    this.selectedFile = null;
  }

  openTab(tabNumber: number) {
    this.activeTab = tabNumber;
    this.getPermessiRichiedente2();
    this.error = ""
    this.message = ""

  }

  ngOnInit() {

    //this.getPermessi();
    //this.getPermessi();
    //this.getPermessiPending();
    //this.getPermessiRichiedenteByStatus();
    this.getPermessiRichiedente2();
  }

  public selezionaPermessoDaCancellare(permesso: Permesso): void {
    this.permessoDaCancellare = permesso;
    //console.log("sono dentro seleziona permesso");
    const button = document.createElement('button');
    const container = document.getElementById('main-container');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#eliminaPermessoModal');
    container?.appendChild(button);

    button.click();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files;
    if (this.selectedFile) {
      document.getElementById("selectFileAlert").style.display = "none";
    }
  }

  // resetModalVariable():void{
  //   document.getElementById("selectFileAlert").style.display = "none";

  // }


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
    document.getElementById("selectFileAlert").style.display = "none";
    this.filenames = [];
  }

  getUploadedFile() {
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



  onUpload(): void {
    const formData = new FormData();
    if (this.selectedFile) {
      for (const file of this.selectedFile) {
        formData.append('files', file, file.name);
      }
      this.fileUploadService.uploadFile(formData, this.permessoSelezionato).subscribe(
        event => {
          //console.log(event);
          this.resportProgress(event);
          this.selectedFile = null;

        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );

      if (this.fileInputRef) {
        this.fileInputRef.nativeElement.value = "";

      }

    } else {
      document.getElementById("selectFileAlert").style.display = "block";
    }

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

  onDeleteFile(filename: string) {
    this.fileUploadService.deleteFile(filename, this.permessoSelezionato.id).subscribe(
      (response: void) => {
        this.getUploadedFile();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
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









  public cancellaPermesso(permesso: Permesso): void {
    this.permessoService.cancellaPermesso(permesso.id).subscribe(
      (response: string) => { //jfoiewfjwoiej
        this.message = response;
        //console.log(response);
        //alert("Permesso cancellato");
        //this.getPermessiRichiedenteByStatus();
        this.getPermessiRichiedente2();



      },
      (error: HttpErrorResponse) => {
        this.error = error.error;
        //alert(error.message);
      },
    );
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

  public svuotaPermessi(): void {
    this.permessiApprovati = [];
    this.permessiPending = [];
    this.permessiRespinti = [];
    this.malattia = [];

  }

  // public getPermessiRichiedenteByStatus(): void {

  //   //localStorage.getItem("currentUser")

  //   //const utente: Utente = this.loginService.currentUserValue;

  //   var values = JSON.parse(localStorage.getItem("currentUser"));
  //   var idUtenteApp = values.id;

  //   this.permessoService.getPermessiRichiedenteByStatus(0, idUtenteApp).subscribe(
  //     (response: Permesso[]) => {
  //       this.permessiPending = response;
  //       console.log(response)
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  //   this.permessoService.getPermessiRichiedenteByStatus(1, idUtenteApp).subscribe(
  //     (response: Permesso[]) => {
  //       this.permessiApprovati = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  //   this.permessoService.getPermessiRichiedenteByStatus(2, idUtenteApp).subscribe(
  //     (response: Permesso[]) => {
  //       this.permessiRespinti = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )
  // }

        // questa funzione è se devono approvare i permessi entrambi gli approvatori
  // public getPermessiRichiedente(): void {

  //   //localStorage.getItem("currentUser")

  //   //const utente: Utente = this.loginService.currentUserValue;
  //   this.svuotaPermessi();
  //   var values = JSON.parse(localStorage.getItem("currentUser"));
  //   var idUtenteApp = values.id;

  //   this.permessoService.getPermessiRichiedente(idUtenteApp).subscribe(
  //     (response: Permesso[]) => {
  //       for (const permessoTrovato of response) {
  //         switch (permessoTrovato.status) {
  //           case 0:

  //             this.permessiPending.push(permessoTrovato);
  //             break;
  //           case 1: // permesso approvato attualmente solo dall'approvatore 1
  //             this.permessiPending.push(permessoTrovato);
  //             break;
  //           case 2: // permesso approvato attualmente solo dall'approvatore 2
  //             this.permessiPending.push(permessoTrovato);
  //             break;
  //           case 3: // permesso approvato da entrambi gli approvatori
  //             if (permessoTrovato.tipoPermesso.includes("Malattia"))
  //               this.malattia.push(permessoTrovato);
  //             else
  //               this.permessiApprovati.push(permessoTrovato);
  //             break
  //           case 4: // respinto da approvatore 1
  //             this.permessiRespinti.push(permessoTrovato);
  //             break;
  //           case 5: // respinto da approvatore 2
  //             this.permessiRespinti.push(permessoTrovato);
  //             break;
  //           default: //console.log("qualcosa non va");
  //         }
  //       }
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   )

  // }

    //questa funzione è se basta che anche solo 1 dei due approvatori approvi il permesso (APPROCCIO VECCHIO)
  public getPermessiRichiedente2(): void {

    //localStorage.getItem("currentUser")

    //const utente: Utente = this.loginService.currentUserValue;
    this.svuotaPermessi();
    var values = JSON.parse(localStorage.getItem("currentUser"));
    var idUtenteApp = values.id;

    this.permessoService.getPermessiRichiedente(idUtenteApp).subscribe(
      (response: Permesso[]) => {
        for (const permessoTrovato of response) {
          switch (permessoTrovato.status) {
            case 0:

              this.permessiPending.push(permessoTrovato);
              break;
            case 1: // permesso approvato dall'approvatore 1
              this.permessiPending.push(permessoTrovato);
              break;
            case 2: // permesso approvato dall'approvatore 2
              this.permessiPending.push(permessoTrovato);
              break;
            case 3: // usato per malattia che deve essere approvato da personale
              // if(permessoTrovato.tipoPermesso.includes("Malattia"))
              //   this.malattia.push(permessoTrovato);
              // else
              this.permessiPending.push(permessoTrovato);
              break
            case 4: // respinto da approvatore 1
              this.permessiRespinti.push(permessoTrovato);
              break;
            case 5: // respinto da approvatore 2
              this.permessiRespinti.push(permessoTrovato);
              break;
            case 6: // approvato da uff personale + approvatore 1 o malattia approvata
              if (permessoTrovato.tipoPermesso.includes("Malattia")) {
                this.malattia.push(permessoTrovato);
              } else {
                this.permessiApprovati.push(permessoTrovato);
              }

              break;
            case 7: // respinto da uff personale
              this.permessiRespinti.push(permessoTrovato);
              break;
            case 8: // approvato da uff personale + approvatore 2
              this.permessiApprovati.push(permessoTrovato);
              break;
            default: //console.log("qualcosa non va");
          }
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }

  
}



