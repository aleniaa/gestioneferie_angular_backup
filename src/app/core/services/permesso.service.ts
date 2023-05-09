import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
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

  public aggiungiPermesso(permesso: Permesso): Observable<Permesso>{
    return this.http.post<Permesso>(`${this.apiServerUrl}/permesso/add`, permesso);

  }

  public getAllPermessi(): Observable<Permesso[]>{
    return this.http.get<any>(`${this.apiServerUrl}/permesso/all`);
  }

  public getAllPermessiCongedo(): Observable<Permesso[]>{
    return this.http.get<any>(`${this.apiServerUrl}/permesso/allCongedo`);
  }

  public search(permesso: Permesso): Observable<Permesso[]>{
    return this.http.post<any>(`${this.apiServerUrl}/permesso/search`, permesso);
  }

  public trovaUtente(idUtente: number): Observable<Utente[]>{
    return this.http.get<any>(`${this.apiServerUrl}/utente/find/${idUtente}`);

  }
}
