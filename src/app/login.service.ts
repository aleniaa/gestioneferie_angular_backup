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
     const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject= new BehaviorSubject<Utente>(
      //{} as any
      storedUser ? JSON.parse(storedUser): null
    );
    this.currentUser = this.currentUserSubject.asObservable();

   }

  //public accediUtente(utente: Utente): Observable<Utente>{
    public accediUtente(utente: Utente){

    //console.log(utente);
    //return this.http.post<any>(`${this.apiServerUrl}/login`, utente, {responseType: 'text' as 'json'})
    return this.http.post<any>(`${this.apiServerUrl}/login`, utente)
    .pipe(map(user => {
      if(user){
        localStorage.setItem('currentUser', JSON.stringify(user));
        //sessionStorage.setItem('currentUser', JSON.stringify(user));

        this.currentUserSubject.next(user);
        console.log("login service success");
        console.log(this.currentUserSubject.value);
      }else{
        console.log("login fallito");
      }

      return user;
    }));
  }

  public get currentUserValue(): Utente | null{
    return this.currentUserSubject.value;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    //sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next({} as any);
    //const utente: Utente = this.currentUserValue;

  }

}
