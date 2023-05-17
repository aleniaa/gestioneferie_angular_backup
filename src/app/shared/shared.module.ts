import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { IMieiPermessiComponent } from '../user/i-miei-permessi/i-miei-permessi.component';



@NgModule({
  declarations: [
    NavbarComponent,
    IMieiPermessiComponent

  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    IMieiPermessiComponent
  ]
})
export class SharedModule { }
