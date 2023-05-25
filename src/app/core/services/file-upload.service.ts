import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  uploadFile(file: File, permesso: Permesso): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('permesso', JSON.stringify(permesso));

    return this.http.post<any>(`${this.apiServerUrl}/upload/uploadFile`, formData, {responseType: 'text' as 'json'});
  }

  getFiles(idPermesso:number): Observable<File[]> {
    let params = new HttpParams()
    .set('idPermesso', idPermesso);
    const headers = new HttpHeaders().append('Accept', 'application/octet-stream');

    return this.http.get<File[]>(`${this.apiServerUrl}/upload/getFile`,{
      params,
      //headers,
      //responseType: 'blob' as 'json'
    });
  }
  
}
