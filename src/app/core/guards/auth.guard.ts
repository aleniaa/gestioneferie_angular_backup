import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login.service';
import { Utente } from '../models/utente';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }      

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const utente: Utente = this.loginService.currentUserValue;
      if (utente) {      
        return true;      
        }      
        // navigate to login page as user is not authenticated      
     this.router.navigate(['/login']);      
      return false; 
  }
  
}
