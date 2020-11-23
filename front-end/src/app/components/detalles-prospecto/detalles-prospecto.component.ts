import { Component, OnInit } from '@angular/core';
import { ProspectoService } from 'src/app/services/prospecto-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-prospecto',
  templateUrl: './detalles-prospecto.component.html',
  styleUrls: ['./detalles-prospecto.component.css']
})
export class DetallesProspectoComponent implements OnInit {
  currentProspecto = {
    id: null,
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    calle: '',
    numero: null,
    colonia: ' ',
    codigo_postal: null,
    telefono: null,
    rfc: ' ',
    status_prospecto: null,
    observaciones: ''
  };
  radioStatus = true;
  constructor(private prospectoService: ProspectoService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getProspecto(this.route.snapshot.paramMap.get('id'));
  }

  getProspecto(id: string | null): void {
    this.prospectoService.get(id)
      .subscribe(
        data => {
          this.currentProspecto = data;
          console.log(data);

        },
        error => {
          console.log(error);
        });
  }

  evaluarProspecto( event: any): void {
    this.currentProspecto.status_prospecto = event.target.value;
  }

  updateStatus(): void {
    const data = {
      nombre: this.currentProspecto.nombre,
      primer_apellido: this.currentProspecto.primer_apellido,
      status_prospecto: this.currentProspecto.status_prospecto,
      observaciones: this.currentProspecto.observaciones
    };
    if (data.status_prospecto === 'autorizado') {
      data.observaciones = '';
    }

    this.prospectoService.update(this.currentProspecto.id, data)
      .subscribe(
        response => {
          Swal.fire({
            title: 'El prospecto se ha evaluado con éxito',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/prospectos']);
          // this.currentProspecto.status_prospecto = status;
          console.log(response);
        },
        error => {
          Swal.fire({
            title: 'Ocurrio un error al evaluar al prospecto',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/prospectos']);
          console.log(error);
        });
  }

  validarEliminacion(): void {
    Swal.fire({
      title: 'Esta seguro que desea eliminar el prospecto?',
      text: 'Esta acción no puede revertirse',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProspecto();
        this.router.navigate(['/prospectos']);

      }
    });
  }

  deleteProspecto(): void {
    this.prospectoService.delete(this.currentProspecto.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/prospectos']);
        },
        error => {
          console.log(error);
        });
  }

}
