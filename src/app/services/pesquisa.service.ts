import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Marca, ModelosResponse, Ano, ValorVeiculo } from '../interfaces/models'; // Importa as interfaces 

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {
  baseUrl = 'https://parallelum.com.br/fipe/api/v1';

  constructor(private http: HttpClient) {}
  

  getMarcas(tipoVeiculo: string): Observable<Marca[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${tipoVeiculo}/marcas`);
  }

  getModelos(tipoVeiculo: string, marcaId: number): Observable<ModelosResponse> {
    return this.http.get<ModelosResponse>(`${this.baseUrl}/${tipoVeiculo}/marcas/${marcaId}/modelos`);
  }

  getAnos(tipoVeiculo: string, marcaId: number, modeloId: number): Observable<Ano[]> {
    return this.http.get<Ano[]>(`${this.baseUrl}/${tipoVeiculo}/marcas/${marcaId}/modelos/${modeloId}/anos`);
  }

  getValorVeiculo(tipoVeiculo: string, marcaId: number, modeloId: number, anoId: string): Observable<ValorVeiculo> {
    return this.http.get<ValorVeiculo>(`${this.baseUrl}/${tipoVeiculo}/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`);
  }
}
