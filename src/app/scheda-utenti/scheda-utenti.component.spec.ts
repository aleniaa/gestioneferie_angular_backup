import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaUtentiComponent } from './scheda-utenti.component';

describe('SchedaUtentiComponent', () => {
  let component: SchedaUtentiComponent;
  let fixture: ComponentFixture<SchedaUtentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedaUtentiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedaUtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
