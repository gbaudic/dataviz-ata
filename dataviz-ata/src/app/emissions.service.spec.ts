import { TestBed, inject } from '@angular/core/testing';

import { EmissionsService } from './emissions.service';

describe('EmissionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmissionsService]
    });
  });

  it('should be created', inject([EmissionsService], (service: EmissionsService) => {
    expect(service).toBeTruthy();
  }));
});
