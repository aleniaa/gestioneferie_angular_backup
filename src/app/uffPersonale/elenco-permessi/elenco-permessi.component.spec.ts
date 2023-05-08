import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoPermessiComponent } from './elenco-permessi.component';

describe('ElencoPermessiComponent', () => {
  let component: ElencoPermessiComponent;
  let fixture: ComponentFixture<ElencoPermessiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElencoPermessiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElencoPermessiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
