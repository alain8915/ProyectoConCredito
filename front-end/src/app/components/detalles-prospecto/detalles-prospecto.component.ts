import { Component, OnInit, OnDestroy} from '@angular/core';
import { ProspectoService } from 'src/app/services/prospecto-service.service';
import { DatosProspecto } from 'src/app/models/currentProspecto.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-detalles-prospecto',
  templateUrl: './detalles-prospecto.component.html',
  styleUrls: ['./detalles-prospecto.component.css']
})
export class DetallesProspectoComponent implements OnInit, OnDestroy {
  currentProspecto: DatosProspecto = new DatosProspecto();
  private unsubscribe: Subject<void> = new Subject();

  constructor(private prospectoService: ProspectoService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getProspecto(this.route.snapshot.paramMap.get('id'));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getProspecto(id: string | null): void {
    this.prospectoService.get(id).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        data => {
          this.currentProspecto = data;
          console.log(data);

        },
        error => {
          Swal.fire({
            title: 'Ocurrió un error al obtener los datos del prospecto',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/prospectos']);
          console.log(error);
        });
  }

  evaluarProspecto( event: any): void {
    this.currentProspecto.status_prospecto = event.target.value;
    this.currentProspecto.observaciones = '';
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

    this.prospectoService.update(this.currentProspecto.id, data).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        response => {
          Swal.fire({
            title: 'El prospecto se ha evaluado con éxito',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/prospectos']);
          console.log(response);
        },
        error => {
          Swal.fire({
            title: 'Ocurrió un error al evaluar al prospecto',
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
    this.prospectoService.delete(this.currentProspecto.id).pipe(takeUntil(this.unsubscribe))
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
