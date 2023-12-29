import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { CreditosComponent } from './creditos/creditos.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirecionamento para página inicial
  { path: 'home', component: HomePageComponent }, // Página inicial (AppComponent)
  { path: 'pesquisa', component: PesquisaComponent }, // Rota para o componente de pesquisa
  { path: 'resultado', component: ResultadoComponent },
  { path: 'creditos', component: CreditosComponent },

  // Outras rotas
  { path: '**', redirectTo: '' }, // Redirecionamento para página inicial caso a rota não exista
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
