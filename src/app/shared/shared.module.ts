import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { IMieiPermessiComponent } from '../user/i-miei-permessi/i-miei-permessi.component';
import { ModificaPassComponent } from './modifica-pass/modifica-pass.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    NavbarComponent,
    IMieiPermessiComponent,
    ModificaPassComponent,
    FooterComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    IMieiPermessiComponent,
    FooterComponent
  ]
})
export class SharedModule { }
