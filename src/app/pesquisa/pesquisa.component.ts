import { Component } from '@angular/core';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent {
  marca: string = '';
  modelo: string = '';
  ano: number | null = null;

  pesquisar() {
    // Aqui você pode implementar a lógica para processar a pesquisa
    // Por exemplo, você pode chamar uma função que consome a API da Tabela FIPE com os valores preenchidos no formulário
    console.log('Marca:', this.marca);
    console.log('Modelo:', this.modelo);
    console.log('Ano:', this.ano);
  }
}
