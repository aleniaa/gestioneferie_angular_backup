import { Utente } from './utente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private apiServerUrl= environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

/*   public accediUtente(accountDipvvf: string, password: string): Observable<object>{
    //console.log(utente);
    return this.http.post<any>(`${this.apiServerUrl}/login`, { accountDipvvf, password })
    //return this.http.post(`${this.apiServerUrl}/utente/login`, utente);
  } */

  public accediUtente(utente: Utente): Observable<object>{
    //console.log(utente);
    return this.http.post<any>(`${this.apiServerUrl}/login`, utente, {responseType: 'text' as 'json'})
    //return this.http.post(`${this.apiServerUrl}/utente/login`, utente);
  }

}
