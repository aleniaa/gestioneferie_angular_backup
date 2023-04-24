import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utente } from '../models/utente';
import { environment } from 'src/enviroments/environment';


@Injectable({
  providedIn: 'root' //questo serve a non inserire questo service in app.module
})
export class UtenteService {

  //
  
  private apiServerUrl= environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUtenti(): Observable<Utente[]>{
    return this.http.get<any>(`${this.apiServerUrl}/utente/all`);

  }

  public aggiungiUtente(utente: Utente): Observable<Utente>{
    return this.http.post<Utente>(`${this.apiServerUrl}/utente/add`, utente);

  }

  public aggiornaUtente(utente: Utente): Observable<Utente>{
    return this.http.put<Utente>(`${this.apiServerUrl}/utente/update`, utente);
  }

  public cancellaUtente(idUtente: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/utente/delete/${idUtente}`);
  }

  public trovaUtente(idUtente: number): Observable<Utente[]>{
    return this.http.get<any>(`${this.apiServerUrl}/utente/find/${idUtente}`);

  }
  
}
