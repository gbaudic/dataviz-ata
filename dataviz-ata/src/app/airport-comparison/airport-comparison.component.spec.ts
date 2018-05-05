import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportComparisonComponent } from './airport-comparison.component';

describe('AirportComparisonComponent', () => {
  let component: AirportComparisonComponent;
  let fixture: ComponentFixture<AirportComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirportComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
