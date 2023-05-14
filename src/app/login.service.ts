import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { Utente } from './core/models/utente';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSubject: BehaviorSubject<Utente | null>;
  public user: Observable<Utente | null>;
  private apiServerUrl= environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

/*   public accediUtente(accountDipvvf: string, password: string): Observable<object>{
    //console.log(utente);
    return this.http.post<any>(`${this.apiServerUrl}/login`, { accountDipvvf, password })
    //return this.http.post(`${this.apiServerUrl}/utente/login`, utente);
  } */

  public accediUtente(utente: Utente): Observable<object>{
    //console.log(utente);
    //return this.http.post<any>(`${this.apiServerUrl}/login`, utente, {responseType: 'text' as 'json'})
    return this.http.post<Utente>(`${this.apiServerUrl}/login`, utente)
    .pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }))
  }

}
