// import { Injectable } from '@angular/core';
// import { PermessoService } from '../core/services/permesso.service';
// import { FileUploadService } from '../core/services/file-upload.service';
// import { Permesso } from '../core/models/permesso';
// import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
// import { saveAs } from 'file-saver-es';

// @Injectable({
//   providedIn: 'root'
// })
// export class SharedFunctionService {

  

//   constructor(private permessoService: PermessoService, private fileUploadService: FileUploadService){
//   }

//   ngOnInit()  {
    
//   }


//   onAllega(){
//     const button = document.createElement('button');
//     const container= document.getElementById('main-container');
    
//     button.type= 'button';
//     button.style.display= 'none';
//     button.setAttribute('data-toggle','modal');
//     button.setAttribute('data-target','#visualizzaAllegatiModal');
//     container?.appendChild(button);
//     button.click();

//     this.fileUploadService.getFiles(permesso.id).subscribe(
//       event => {
//         console.log(event);
//         this.resportProgress(event);
//       },
//       (error: HttpErrorResponse) => {
//         console.log(error);
//       }
//     );

//     filenames=[];

//   }


//   onVisualizzaAllegati(permesso: Permesso, filenames: string[] = []):void{
  
    
//     const button = document.createElement('button');
//     const container= document.getElementById('main-container');
    
//     button.type= 'button';
//     button.style.display= 'none';
//     button.setAttribute('data-toggle','modal');
//     button.setAttribute('data-target','#visualizzaAllegatiModal');
//     container?.appendChild(button);
    
//     button.click();

    
//     this.fileUploadService.getFiles(permesso.id).subscribe(
//       event => {
//         console.log(event);
//         this.resportProgress(event);
//       },
//       (error: HttpErrorResponse) => {
//         console.log(error);
//       }
//     );

//     filenames=[];
//   }

//   getUploadedFile(permesso: Permesso, filenames: string[] = []){
//     this.fileUploadService.getFiles(permesso.id).subscribe(
//       event => {
//         console.log(event);
//         this.resportProgress(event);

//       },
//       (error: HttpErrorResponse) => {
//         console.log(error);
//       }
//     );

//     filenames=[];
//   }


  
//   onUpload(selectedFile: File[], permessoSelezionato: Permesso): void {
//     const formData = new FormData();
//     if(selectedFile){
//       for (const file of selectedFile) { 
//         formData.append('files', file, file.name);
//        }
//       this.fileUploadService.uploadFile(formData, permessoSelezionato).subscribe(
//         event => {
//           console.log(event);
//           this.resportProgress(event);
//           selectedFile=null;
          
//         },
//         (error: HttpErrorResponse) => {
//           console.log(error);
//         }
//       );

//       // if (this.fileInputRef) {
//       //   this.fileInputRef.nativeElement.value = "";

//       // }
      
//     }else{
//       document.getElementById("selectFileAlert").style.display = "block";
//     }

//   }

//     // define a function to download files
//     onDownloadFile(filename: string, permessoSelezionato: Permesso): void {
//       this.fileUploadService.download(filename, permessoSelezionato.id).subscribe(
//         event => {
//           console.log(event);
//           this.resportProgress(event);
//         },
//         (error: HttpErrorResponse) => {
//           console.log(error);
//         }
//       );
//     }

//     onDeleteFile(filename: string, permessoSelezionato: Permesso){
//       this.fileUploadService.deleteFile(filename, permessoSelezionato.id).subscribe(
//         (response: void) => { 
//           this.getUploadedFile();
  
//         },
//         (error: HttpErrorResponse) => {
//           alert(error.message);
//         },
//       );
//     }
  


//   private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
//     switch(httpEvent.type) {
//       case HttpEventType.UploadProgress:
//         this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
//         break;
//       case HttpEventType.DownloadProgress:
//         this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
//         break;
//       case HttpEventType.ResponseHeader:
//         console.log('Header returned', httpEvent);
//         break;
//       case HttpEventType.Response:
//         if (httpEvent.body instanceof Array) {
//           this.fileStatus.status = 'done';
//           for (const filename of httpEvent.body) {
//             this.filenames.unshift(filename);
//           }
//           console.log('Ho appena aggiunto un file a filenames');
//         } else {
//           saveAs(new File([httpEvent.body!], httpEvent.headers.get('Content-Disposition').split(';')[1].trim().substring(9)!, 
//                   {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));

//         }
//         this.fileStatus.status = 'done';
//         break;
//         default:
//           console.log(httpEvent);
//           break;
      
//     }
//   }

//   private updateStatus(loaded: number, total: number, requestType: string): void {
//     this.fileStatus.status = 'progress';
//     this.fileStatus.requestType = requestType;
//     this.fileStatus.percent = Math.round(100 * loaded / total);
//   }


// }







