import { Qualifica } from './../models/qualifica';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class QualificaService {

  private apiServerUrl= environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getQualifiche(): Observable<Qualifica[]>{
    return this.http.get<any>(`${this.apiServerUrl}/qualifica/all`);

  }
  
}
