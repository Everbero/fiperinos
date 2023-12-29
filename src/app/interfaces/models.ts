// models.ts

export interface Marca {
  codigo: number;
  nome: string;
}

export interface Modelo {
  codigo: number;
  nome: string;
}

export interface ModelosResponse {
  modelos: Modelo[];
}

export interface Ano {
  codigo: string;
  nome: string;
}
export interface ValorVeiculo {
  TipoVeiculo: number;
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  SiglaCombustivel: string;
}