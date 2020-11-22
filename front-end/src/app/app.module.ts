import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProspectoComponent } from './components/add-prospecto/add-prospecto.component';
import { DetallesProspectoComponent } from './components/detalles-prospecto/detalles-prospecto.component';
import { ListaProspectosComponent } from './components/lista-prospectos/lista-prospectos.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProspectoComponent,
    DetallesProspectoComponent,
    ListaProspectosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
