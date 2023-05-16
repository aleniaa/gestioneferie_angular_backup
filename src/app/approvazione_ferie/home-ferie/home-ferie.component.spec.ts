import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFerieComponent } from './home-ferie.component';

describe('HomeFerieComponent', () => {
  let component: HomeFerieComponent;
  let fixture: ComponentFixture<HomeFerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFerieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
