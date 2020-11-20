import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProspectoComponent } from './components/add-prospecto/add-prospecto.component';
import { DetallesProspectoComponent } from './components/detalles-prospecto/detalles-prospecto.component';
import { ListaProspectosComponent } from './components/lista-prospectos/lista-prospectos.component';
const routes: Routes = [
  { path: '', redirectTo: 'prospectos', pathMatch: 'full' },
  { path: 'prospectos', component: ListaProspectosComponent },
  { path: 'prospectos/:id', component: DetallesProspectoComponent },
  { path: 'add', component: AddProspectoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
