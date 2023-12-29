import { TestBed } from '@angular/core/testing';

import { TipoVeiculoService } from './tipo-veiculo.service';

describe('TipoVeiculoService', () => {
  let service: TipoVeiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoVeiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
