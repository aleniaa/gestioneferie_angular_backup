import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPassComponent } from './modifica-pass.component';

describe('ModificaPassComponent', () => {
  let component: ModificaPassComponent;
  let fixture: ComponentFixture<ModificaPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
