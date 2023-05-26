import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
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
  selectedFile: File[];
  allegato: File[];
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

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
    this.selectedFile = event.target.files;

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

  // downloadFiles(): void {
  //   if (this.allegato && this.allegato.length > 0) {
  //     for (let i = 0; i < this.allegato.length; i++) {
  //       const file = this.allegato[i];
  //       const url = window.URL.createObjectURL(file);
  //       const a = document.createElement('a');
  //       document.body.appendChild(a);
  //       a.href = url;
  //       a.download = file.name; // Set the desired filename
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //       a.remove();
  //     }
  //   } else {
  //     // Handle the case when allegato is empty or null
  //     console.error('No files to download');
  //   }
  // }
  
  onUpload(): void {
    const formData = new FormData();
    for (const file of this.selectedFile) { 
      formData.append('files', file, file.name);
     }
    this.fileUploadService.uploadFile(formData, this.permessoSelezionato).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
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
  

  
  // onUpload(): void {

  //   if (this.selectedFile) {
  //     console.log(this.selectedFile)
  //     this.fileUploadService.uploadFile(this.selectedFile, this.permessoSelezionato).subscribe(
  //       (response: any) => {
  //         console.log(response);
  //         alert('File uploaded successfully');
  //       },
  //       (error: any) => {
  //         console.error(error);
  //         alert('Failed to upload file');
  //       }
  //     );
  //   }
  // }


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
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('Content-Disposition').split(';')[1].trim().substring(9)!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
          console.log(httpEvent.headers.get('Content-Disposition').split(';')[1].trim().substring(9));
          console.log(httpEvent.headers.get('Content-Type'));

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



