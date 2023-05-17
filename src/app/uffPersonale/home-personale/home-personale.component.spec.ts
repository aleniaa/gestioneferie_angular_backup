import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePersonaleComponent } from './home-personale.component';

describe('HomePersonaleComponent', () => {
  let component: HomePersonaleComponent;
  let fixture: ComponentFixture<HomePersonaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePersonaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePersonaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
