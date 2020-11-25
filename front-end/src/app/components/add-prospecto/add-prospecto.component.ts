import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProspectoService } from 'src/app/services/prospecto-service.service';
import { DatosProspecto } from 'src/app/models/datosProspecto.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-prospecto',
  templateUrl: './add-prospecto.component.html',
  styleUrls: ['./add-prospecto.component.css']
})
export class AddProspectoComponent implements OnInit, OnDestroy {
  prospecto: DatosProspecto = new DatosProspecto();
  private unsubscribe: Subject<void> = new Subject();
  archivoBase64: any;
  @ViewChild('archivoCSF', { static: false }) archivoCSF: any;
  @ViewChild('imagenCSF', { static: false }) imagenCSF: any;


  constructor(private prospectoService: ProspectoService, private router: Router) { }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

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
      rfc: this.prospecto.rfc,
      nombreDocumento: this.prospecto.nombreDocumento,
      dataDocumento: this.archivoBase64.toString()
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

  subirArchivoCSF(): void {
    this.archivoCSF.nativeElement.click();
  }

  cambioArchivoCSF(): void {

    const files: { [key: string]: File } = this.archivoCSF.nativeElement.files;
    let reader;

    if (files && files[0]) {
      // valida extensión
        console.log('hay archivo');

        reader = new FileReader();

        reader.onload = (e: any) => {
          console.log('set src pdf');
          this.archivoBase64 = e.target.result;
        };

        reader.readAsDataURL(files[0]);
        this.imagenCSF.nativeElement.setAttribute(
          'src',
          '../../../../../assets/pdf.jpg'
        );

      }
    }
  }
