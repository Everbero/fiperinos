import { NgModule } from '@angular/core'; // Importação do módulo principal
import { BrowserModule } from '@angular/platform-browser'; // Importação do módulo de renderização do browser
import { AppRoutingModule } from './app-routing.module'; // Importação do módulo de rotas
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // Importação do módulo de formulários
import { HttpClientModule } from '@angular/common/http';
// componentes
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importação do módulo de componentes do Bootstrap
import { AppComponent } from './app.component'; // Importação do componente principal
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { CreditosComponent } from './creditos/creditos.component';


@NgModule({
  declarations: [
    AppComponent,
    PesquisaComponent,
    HomePageComponent,
    ResultadoComponent,
    CreditosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
