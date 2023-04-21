import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiUtenteFormComponent } from './aggiungi-utente-form.component';

describe('AggiungiUtenteFormComponent', () => {
  let component: AggiungiUtenteFormComponent;
  let fixture: ComponentFixture<AggiungiUtenteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiUtenteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiungiUtenteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
