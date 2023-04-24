import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiestaFerieFormComponent } from './richiesta-ferie-form.component';

describe('RichiestaFerieFormComponent', () => {
  let component: RichiestaFerieFormComponent;
  let fixture: ComponentFixture<RichiestaFerieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RichiestaFerieFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RichiestaFerieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
