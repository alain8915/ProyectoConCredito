import { Component, OnInit } from '@angular/core';
import { ProspectoService } from 'src/app/services/prospecto-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-prospecto',
  templateUrl: './add-prospecto.component.html',
  styleUrls: ['./add-prospecto.component.css']
})
export class AddProspectoComponent implements OnInit {
  prospecto = {
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    calle: '',
    numero: null,
    colonia: ' ',
    codigo_postal: null,
    telefono: null,
    rfc: ' '
  };
  submitted = false;

  constructor(private prospectoService: ProspectoService, private router: Router) { }

  ngOnInit(): void {
  }

  guardarProspecto(): void {
    const data = {
      nombre: this.prospecto.nombre,
      primer_apellido: this.prospecto.primer_apellido,
      segundo_apellido: this.prospecto.segundo_apellido ? this.prospecto.segundo_apellido : '',
      calle: this.prospecto.calle,
      numero: this.prospecto.numero,
      colonia: this.prospecto.colonia,
      codigo_postal: this.prospecto.codigo_postal,
      telefono: this.prospecto.telefono,
      rfc: this.prospecto.rfc
    };

    this.prospectoService.create(data)
      .subscribe(
        response => {
          Swal.fire({
            title: 'El prospecto se ha guardado con éxito',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
          console.log(response);
          this.router.navigate(['/prospectos']);
          this.submitted = true;
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Ocurrio un error en el guardado del prospecto',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        });
  }

  nuevoProspecto(): void {
    this.submitted = false;
    this.prospecto = {
      nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      calle: '',
      numero: null,
      colonia: ' ',
      codigo_postal: null,
      telefono: null,
      rfc: ' '
    };
  }

  validarSalida(): void {
    Swal.fire({
      title: 'Esta seguro que desea salir?',
      text: 'Si sale perderá toda la captura',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/prospectos']);

      }
    });
  }

}
