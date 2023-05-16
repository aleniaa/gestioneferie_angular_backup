import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMieiPermessiComponent } from './i-miei-permessi.component';

describe('IMieiPermessiComponent', () => {
  let component: IMieiPermessiComponent;
  let fixture: ComponentFixture<IMieiPermessiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IMieiPermessiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IMieiPermessiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
