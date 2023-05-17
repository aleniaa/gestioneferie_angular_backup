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

  private currentUserSubject: BehaviorSubject<Utente | null>;
  public currentUser: Observable<Utente | null>;
  private apiServerUrl= environment.apiBaseUrl;

  constructor(private http: HttpClient) {

    this.currentUserSubject= new BehaviorSubject<Utente>({} as any);
    this.currentUser = this.currentUserSubject.asObservable();

   }

/*   public accediUtente(accountDipvvf: string, password: string): Observable<object>{
    //console.log(utente);
    return this.http.post<any>(`${this.apiServerUrl}/login`, { accountDipvvf, password })
    //return this.http.post(`${this.apiServerUrl}/utente/login`, utente);
  } */

  public accediUtente(utente: Utente): Observable<Utente>{
    //console.log(utente);
    //return this.http.post<any>(`${this.apiServerUrl}/login`, utente, {responseType: 'text' as 'json'})
    return this.http.post<any>(`${this.apiServerUrl}/login`, utente)
    .pipe(map(user => {
      if(user){
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        console.log("login service success");
        console.log(this.currentUserSubject.value);
      }else{
        console.log("non funziona un cazzo");
      }

      return user;
    }));
  }

  public get currentUserValue(): Utente {
    return this.currentUserSubject.value;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({} as any);
    const utente: Utente = this.currentUserValue;
    console.log(utente);

  }

}
