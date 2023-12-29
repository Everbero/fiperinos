import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoVeiculoService } from '../services/tipo-veiculo.service';
import { PesquisaService } from '../services/pesquisa.service';
import { ValorVeiculo } from '../interfaces/models';
import Chart from 'chart.js/auto';

import { forkJoin } from 'rxjs';
// imagens dos veiculos
import { BingImageSearchService } from '../services/bing-image-search.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css'],
})
export class ResultadoComponent implements OnInit {
  valorVeiculo: any; // Tipo dos seus dados do veículo
  nomeTipoVeiculo: string | undefined;
  precosPorAno: ValorVeiculo[] = [];
  // ibagens
  images: any[] = [];
  // coisas do gráfico
  @ViewChild('grafico') graficoCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  grafico: Chart | null = null;

  constructor(
    private route: ActivatedRoute,
    private tipoVeiculoService: TipoVeiculoService,
    private pesquisaService: PesquisaService,
    private bingImageSearchService: BingImageSearchService
  ) {}

  ngOnInit(): void {
    this.valorVeiculo = history.state.valorVeiculo;
    this.obterNomeTipoVeiculo();
    this.obterPrecosPorAno();
  }
  obterNomeTipoVeiculo(): void {
    if (this.valorVeiculo && this.valorVeiculo.TipoVeiculo) {
      this.nomeTipoVeiculo = this.tipoVeiculoService.obterNomeTipoVeiculo(
        this.valorVeiculo.TipoVeiculo
      );
    }
  }
  obterPrecosPorAno(): void {
    if (this.valorVeiculo) {
      const { tipoVeiculo, marcaId, modeloId } = this.valorVeiculo;
      console.log('valorVeiculo', this.valorVeiculo);
      console.log(
        'tipoVeiculo',
        tipoVeiculo,
        'MarcaId',
        marcaId,
        'ModeloId',
        modeloId
      );

      this.pesquisaService.getAnos(tipoVeiculo, marcaId, modeloId).subscribe(
        (anos: any[]) => {
          anos.sort((a, b) => {
            // Ordenando os anos do mais antigo para o mais recente
            return parseInt(a.codigo) - parseInt(b.codigo);
          });
          // Reduzindo a quantidade de chamadas simultâneas
          const requests = anos.map((ano: any) =>
            this.pesquisaService.getValorVeiculo(
              tipoVeiculo,
              marcaId,
              modeloId,
              ano.codigo
            )
          );

          forkJoin(requests).subscribe(
            (valores: ValorVeiculo[]) => {
              this.precosPorAno = valores;
              this.plotarGrafico();
            },
            (error) => {
              console.error('Erro ao obter preços por ano', error);
            }
          );
        },
        (error) => {
          console.error('Erro ao obter anos', error);
        }
      );

      this.searchImages(this.valorVeiculo.Modelo);
    }
  }
  ngAfterViewInit(): void {
    // Chama o método após a view ter sido inicializada para garantir que o DOM está pronto
    this.plotarGrafico();
  }
  plotarGrafico(): void {
    const anos = this.precosPorAno.map((preco) => preco.AnoModelo);
    const valores = this.precosPorAno.map(
      (preco) =>
        parseInt(
          preco.Valor.replace('R$ ', '').replace(',00', '').replace('.', '')
        )
      // Removendo o R$ e formatando o valor para inteiro
    );

    if (this.grafico) {
      this.grafico.destroy();
    }

    if (this.graficoCanvas && this.graficoCanvas.nativeElement) {
      const graficoCanvas: HTMLCanvasElement = this.graficoCanvas.nativeElement;
      const parentWidth = graficoCanvas.parentElement?.offsetWidth;
      // obtem a altura do elemento pai
      const parentHeight = graficoCanvas.parentElement?.offsetHeight;

      if (parentWidth && parentHeight) {
        graficoCanvas.width = parentWidth;
        graficoCanvas.height = parentHeight; // Defina a altura desejada para o gráfico
      }

      // Agora, após definir a largura e altura do canvas, crie o gráfico
      this.grafico = new Chart(graficoCanvas, {
        type: 'line',
        data: {
          labels: anos,
          datasets: [
            {
              label: 'Evolução do Preço do ' + this.valorVeiculo.Modelo,
              data: valores,
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.5,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return (
                    context.dataset.label +
                    ': ' +
                    context.parsed.y.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  );
                },
              },
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Valor (R$)',
              },
              ticks: {
                // Callback para formatar os valores do eixo Y
                callback: function (value: any) {
                  return value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  });
                },
              },
            },
            x: {
              title: {
                display: true,
                text: 'Modelo',
              },
            },
          },
        },
      });
    }
  }

  // imagens dos veiculos
  searchImages(query: string): void {
    this.bingImageSearchService.searchImages(query).subscribe(
      (data: any) => {
        console.log('Resposta da pesquisa de imagens:', data);
        this.images =
          data?.value.map(
            (
              result: {
                contentUrl: any;
                thumbnailUrl: any;
                alt: any;
                title: any;
              },
              index: number
            ) => ({
              image: result.contentUrl,
              thumbImage: result.thumbnailUrl,
              alt: this.valorVeiculo?.Modelo,
              title: this.valorVeiculo?.Modelo,
              manageImageRatio: true,
            })
          ) || [];
        console.log('Imagens do veículo:', this.images);
      },
      (error) => {
        console.error('Erro ao pesquisar imagens do veículo:', error);
      }
    );
  }
}
