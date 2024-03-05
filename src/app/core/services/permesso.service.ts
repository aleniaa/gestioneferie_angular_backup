import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utente } from '../models/utente';
import { environment } from 'src/enviroments/environment';
import { Permesso } from '../models/permesso';
@Injectable({
  providedIn: 'root'
})
export class PermessoService {

  private apiServerUrl= environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUtentiFerie(): Observable<Utente[]>{
    return this.http.get<any>(`${this.apiServerUrl}/utente/ferie`);

  }

  // public aggiungiPermesso(permesso: Permesso): Observable<Permesso>{
  //   return this.http.post<Permesso>(`${this.apiServerUrl}/permesso/add`, permesso);

  // }

  // public aggiungiPermesso(permesso: Permesso){
    
  //   return this.http.post<any>(`${this.apiServerUrl}/permesso/add`, permesso, {responseType: 'text' as 'json'});

  // }

  public aggiungiPermesso(permesso: Permesso, idUtenteLoggato: number){
    let params = new HttpParams()
    .set('idUtenteLoggato', idUtenteLoggato);

    console.log("id utente loggato dentro il peremsso service angular:")
    console.log(idUtenteLoggato.toString());

    return this.http.post<any>(`${this.apiServerUrl}/permesso/add`, permesso, {params: params, responseType: 'text' as 'json'});

  }

  public getAllPermessi(): Observable<Permesso[]>{
    return this.http.get<any>(`${this.apiServerUrl}/permesso/all`);
  }


  public getAllPermessiCongedo(): Observable<Permesso[]>{
    return this.http.get<any>(`${this.apiServerUrl}/permesso/allCongedo`);
  }

  //public search(permesso: Permesso, dataAssenza: string): Observable<Permesso[]>{
    public search(permesso: Permesso, dataAssenza: string, status :number): Observable<Permesso[]>{

    let params = new HttpParams()
    .set('dataAssenza', dataAssenza)
    .set('status', status);
    return this.http.post<any>(`${this.apiServerUrl}/permesso/search`, permesso,{params: params});
  }

  public approvaPermesso(permesso: Permesso, idApprovatore:number ): Observable<Permesso> {
    let params = new HttpParams()
    .set('idApprovatore', idApprovatore);
    return this.http.put<Permesso>(`${this.apiServerUrl}/permesso/approvaPermesso`, permesso,{params: params});
  } 

  public aggiornaPermesso(permesso: Permesso, idApprovatore:number, statusPermesso:number ): Observable<Permesso> {
    let params = new HttpParams()
    .set('idApprovatore', idApprovatore)
    .set('statusPermesso', statusPermesso);
    return this.http.put<Permesso>(`${this.apiServerUrl}/permesso/aggiornaPermesso`, permesso,{params: params});
  } 

  public approvaPermessoPersonale(permesso: Permesso ): Observable<Permesso> {

    return this.http.put<Permesso>(`${this.apiServerUrl}/permesso/confermaPermessoPersonale`, permesso);
  } 


  public respingiPermesso(note: string, permesso: Permesso, idApprovatore: number): Observable<Permesso> {
    let params = new HttpParams()
    .set('note', note)
    .set('idApprovatore', idApprovatore);
    return this.http.put<Permesso>(`${this.apiServerUrl}/permesso/respingiPermesso`, permesso,{params: params});
  }

  public getPermessiByStatus(status: number): Observable<Permesso[]>{
    return this.http.get<any>(`${this.apiServerUrl}/permesso/status/${status}`);
  }

  public getPermessiRichiedenteByStatus(status: number, idRichiedente: number): Observable<Permesso[]>{
    
    let params = new HttpParams()
    .set('idRichiedente', idRichiedente);
    return this.http.get<any>(`${this.apiServerUrl}/permesso/statusRichiedente/${status}`,{params: params});
  }

  public getPermessiRichiedente(idRichiedente: number): Observable<Permesso[]>{
    
    let params = new HttpParams()
    .set('idRichiedente', idRichiedente);
    return this.http.get<any>(`${this.apiServerUrl}/permesso/permessiRichiedente`,{params: params});
  }

  public getPermessiApprovatoreByStatus(status: number, idApprovatore: number): Observable<Permesso[]>{
    
    let params = new HttpParams()
    .set('idApprovatore', idApprovatore);
    return this.http.get<any>(`${this.apiServerUrl}/permesso/statusApprovatore/${status}`,{params: params});
  }
  

  public getPermessiApprovatore(idApprovatore: number): Observable<Permesso[]>{
    
    let params = new HttpParams()
    .set('idApprovatore', idApprovatore);
    return this.http.get<any>(`${this.apiServerUrl}/permesso/permessiApprovatore`,{params: params});
  }

  public cancellaPermesso(idPermesso: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/permesso/delete/${idPermesso}`);
  }

}
