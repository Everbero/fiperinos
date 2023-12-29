import { Component, OnInit } from '@angular/core';
import { PesquisaService } from '../services/pesquisa.service';
import {
  Marca,
  Modelo,
  ModelosResponse,
  Ano,
  ValorVeiculo,
} from '../interfaces/models'; // Importa as interfaces
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css'],
})
export class PesquisaComponent implements OnInit {
  marcas: Marca[] = [];
  modelos: Modelo[] = [];
  anos: Ano[] = [];
  tipoVeiculo = 'carros';
  marcaId: number = 0;
  modeloId: number = 0;
  anoId: string = '0';
  valorVeiculo: ValorVeiculo | undefined;

  constructor(
    private pesquisaService: PesquisaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarMarcas();
  }

  onChangeTipoVeiculo() {
    this.carregarMarcas();
  }

  carregarMarcas() {
    this.pesquisaService
      .getMarcas(this.tipoVeiculo)
      .subscribe((data: Marca[]) => {
        this.marcas = [...data];
      });
  }

  carregarModelos() {
    if (this.marcaId) {
      this.pesquisaService
        .getModelos(this.tipoVeiculo, this.marcaId)
        .subscribe((data: ModelosResponse) => {
          this.modelos = [...data.modelos];
        });
    }
  }

  carregarAnos() {
    if (this.marcaId && this.modeloId) {
      this.pesquisaService
        .getAnos(this.tipoVeiculo, this.marcaId, this.modeloId)
        .subscribe((data: Ano[]) => {
          // Faça o que for necessário com os anos carregados (por exemplo, atribuir a uma variável anos)
          this.anos = [...data];
        });
    }
  }
  carregarValorVeiculo() {
    if (this.marcaId && this.modeloId && this.anoId) {
      this.pesquisaService
        .getValorVeiculo(
          this.tipoVeiculo,
          this.marcaId,
          this.modeloId,
          this.anoId
        )
        .subscribe((data: ValorVeiculo) => {
          this.valorVeiculo = data;
          // Faça o que for necessário com os dados do valor do veículo (por exemplo, atribuir a uma variável)
          console.log(data); // Exemplo: Mostrar no console

          this.redirecionarComDadosSelecionados();
        });
    }
  }
  redirecionarComDadosSelecionados() {
    if (this.valorVeiculo) {
      // Simulando dados do veículo selecionado
      const dadosVeiculo = {
        ...this.valorVeiculo,
        tipoVeiculo: this.tipoVeiculo,
        marcaId: this.marcaId,
        modeloId: this.modeloId,
      };

      // Redirecionar para a rota de resultado com os dados do veículo
      this.router.navigate(['/resultado'], {
        state: { valorVeiculo: dadosVeiculo },
      });
    }
  }
}
