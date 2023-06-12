import { TestBed } from '@angular/core/testing';

import { QualificaService } from './qualifica.service';

describe('QualificaService', () => {
  let service: QualificaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualificaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
