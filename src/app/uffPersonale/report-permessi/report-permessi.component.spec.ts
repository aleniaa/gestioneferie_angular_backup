import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPermessiComponent } from './report-permessi.component';

describe('ReportPermessiComponent', () => {
  let component: ReportPermessiComponent;
  let fixture: ComponentFixture<ReportPermessiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPermessiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPermessiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
