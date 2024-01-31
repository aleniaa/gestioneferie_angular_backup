
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Utente } from '../core/models/utente';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public username: string;
  public password: string;
  passwordTyped: boolean = false;

  public utente: Utente;
  
  error: string;

  constructor(private loginService: LoginService, private route: Router) {
    this.error = '';
    this.username='';
    this.password='';
   }

  ngOnInit(): void {
  }


  public accediUtente(){
    this.loginService.accediUtente(this.username,this.password)
    .pipe(first())
            .subscribe({
                next: (data) => {
                    // get return url from query parameters or default to home page
                    console.log(data);
                    
                    if(data) 
                     switch (data.ruolo) {
                      case 'ADMIN':
                        this.route.navigate(['/admin']);
                        break;
                      case 'FERIE':
                        this.route.navigate(['/ferie']);
                        break;
                      case 'PERSONALE':
                        this.route.navigate(['/personale']);
                        break;
                      case 'UTENTE':
                        console.log("caso login ruolo utente:   UTENTE");
                        this.route.navigate(['/utente']);
                        break;
                      default:
                        this.error = 'Credenziali non valide';
                        console.log(this.error);
                     }

                },
                error: () => {

                  this.error = 'Username o password non validi';
                  //loginForm.reset();
                  this.password=""
                  this.passwordTyped= false
                  console.log(this.error);
                }
            }
            
            );
  }

}























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































