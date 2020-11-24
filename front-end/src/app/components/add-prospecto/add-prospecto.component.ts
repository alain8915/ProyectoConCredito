import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProspectoService } from 'src/app/services/prospecto-service.service';
import { DatosProspecto } from 'src/app/models/datosProspecto.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-prospecto',
  templateUrl: './add-prospecto.component.html',
  styleUrls: ['./add-prospecto.component.css']
})
export class AddProspectoComponent implements OnInit, OnDestroy {
  prospecto: DatosProspecto = new DatosProspecto();
  private unsubscribe: Subject<void> = new Subject();

  constructor(private prospectoService: ProspectoService, private router: Router) { }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();  }

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

    this.prospectoService.create(data).pipe(takeUntil(this.unsubscribe))
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
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Ocurrió un error en el guardado del prospecto',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        });
  }

  nuevoProspecto(): void {

    this.prospecto = new DatosProspecto();

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
