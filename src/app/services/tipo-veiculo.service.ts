import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoVeiculoService {
  tiposVeiculo: Record<number, string> = {
    1: 'Carro',
    2: 'Moto',
    3: 'Caminhão'
  };

  obterNomeTipoVeiculo(numeroTipo: number): string {
    return this.tiposVeiculo[numeroTipo] || 'Desconhecido';
  }
}
