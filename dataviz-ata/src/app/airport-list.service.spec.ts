import { TestBed, inject } from '@angular/core/testing';

import { AirportListService } from './airport-list.service';

describe('AirportListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirportListService]
    });
  });

  it('should be created', inject([AirportListService], (service: AirportListService) => {
    expect(service).toBeTruthy();
  }));
});
