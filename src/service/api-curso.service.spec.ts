import { TestBed } from '@angular/core/testing';

import { ApiCursoService } from './api-curso.service';

describe('ApiCursoService', () => {
  let service: ApiCursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
