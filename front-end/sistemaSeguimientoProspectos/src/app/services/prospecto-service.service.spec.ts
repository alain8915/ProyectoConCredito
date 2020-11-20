import { TestBed } from '@angular/core/testing';

import { ProspectoServiceService } from './prospecto-service.service';

describe('ProspectoServiceService', () => {
  let service: ProspectoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProspectoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
