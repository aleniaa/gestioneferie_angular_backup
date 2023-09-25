import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { Permesso } from '../models/permesso';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private apiServerUrl= environment.apiBaseUrl;
  
  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData, permesso: Permesso): Observable<any> {

    formData.append('permesso', JSON.stringify(permesso));

    return this.http.post<string[]>(`${this.apiServerUrl}/upload/uploadFile`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getFiles(idPermesso:number): Observable<any> {
    let params = new HttpParams()
    .set('idPermesso', idPermesso);

    return this.http.get<string[]>(`${this.apiServerUrl}/upload/getFile`,{
      params,
      reportProgress: true,
      observe: 'events'
    });
  }

    // define function to download files
    download(filename: string, idPermesso:number): Observable<HttpEvent<Blob>> {
      let params = new HttpParams()
    .set('idPermesso', idPermesso);
      return this.http.get(`${this.apiServerUrl}/upload/download/${filename}`, {
        params,
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
      });
    }

    // display(filename: string, idPermesso:number): Observable<Blob> {
    //   let params = new HttpParams()
    // .set('idPermesso', idPermesso);
    //   return this.http.get(`${this.apiServerUrl}/upload/show/${filename}`, {
    //     params,
    //     responseType: 'blob'
    //   });
    // }

    deleteAllFile(filename: string, idPermesso:number): Observable<void>{
      let params = new HttpParams()
      .set('idPermesso', idPermesso);
        return this.http.delete<void>(`${this.apiServerUrl}/upload/deleteAllFile/${filename}`, {params});
    }

    deleteFile(filename: string, idPermesso:number): Observable<void>{
      let params = new HttpParams()
      .set('idPermesso', idPermesso);
        return this.http.delete<void>(`${this.apiServerUrl}/upload/deleteFile/${filename}`, {params});
    }
  
}
