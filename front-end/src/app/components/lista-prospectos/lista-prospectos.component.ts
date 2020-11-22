import { Component, OnInit } from '@angular/core';
import { ProspectoService } from 'src/app/services/prospecto-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-prospectos',
  templateUrl: './lista-prospectos.component.html',
  styleUrls: ['./lista-prospectos.component.css']
})
export class ListaProspectosComponent implements OnInit {

  prospectos: any;
  currentProspecto = {
    id: null,
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    status_prospecto: ''
  };
  currentIndex = -1;
  nombre = '';

  constructor(private prospectoService: ProspectoService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerProspectos();
  }

  obtenerProspectos(): void {
    this.prospectoService.getAll()
      .subscribe(
        data => {
          this.prospectos = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.obtenerProspectos();
    this.currentProspecto = {
      id: null,
      nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      status_prospecto: ''
    };
    this.currentIndex = -1;
  }

  setActiveProspecto(prospecto: any, index: number): void {
    this.currentProspecto = prospecto;
    this.currentIndex = index;
    this.detallesProspecto();

  }

  detallesProspecto(): void {
    this.router.navigate(['/prospectos/' + this.currentProspecto.id]);
  }

  eliminarTodosLosProspectos(): void {
    this.prospectoService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.obtenerProspectos();
        },
        error => {
          console.log(error);
        });
  }

  buscarProspecto(): void {
    this.prospectoService.findByName(this.nombre)
      .subscribe(
        data => {
          this.prospectos = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
