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

  public changeStatus(decisione: string, permesso: Permesso): Observable<Permesso> {
    return this.http.put<Permesso>(`${this.apiServerUrl}/permesso/updateStatus/${decisione}`, permesso);
  } 

  public getPermessiByStatus(status: number): Observable<Permesso[]>{
    return this.http.get<any>(`${this.apiServerUrl}/permesso/status/${status}`);
  }

  public getPermessiRichiedenteByStatus(status: number, idRichiedente: number): Observable<Permesso[]>{
    
    let params = new HttpParams()
    .set('idRichiedente', idRichiedente);
    return this.http.get<any>(`${this.apiServerUrl}/permesso/statusRichiedente/${status}`,{params: params});
  }

}
