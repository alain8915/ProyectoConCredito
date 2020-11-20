import { Component, OnInit } from '@angular/core';
import { ProspectoService } from 'src/app/services/prospecto-service.service';

@Component({
  selector: 'app-add-prospecto',
  templateUrl: './add-prospecto.component.html',
  styleUrls: ['./add-prospecto.component.css']
})
export class AddProspectoComponent implements OnInit {
  prospecto = {
    nombre: '',
    primer_apellido: '',
    calle: '',
    numero: null,
    colonia: ' ',
    codigo_postal: null,
    telefono: null,
    rfc: ' ',
    id_documento: null
  };

  constructor(private prospectoService: ProspectoService ) { }

  ngOnInit(): void {
  }

  guardarProspecto(): void {
    const data = {
      nombre: this.prospecto.nombre,
      primer_apellido: this.prospecto.primer_apellido,
      calle: this.prospecto.calle,
      numero: this.prospecto.numero,
      colonia: this.prospecto.colonia,
      codigo_postal: this.prospecto.codigo_postal,
      telefono: this.prospecto.telefono,
      rfc: this.prospecto.rfc,
      id_documento: this.prospecto.id_documento

    };

    this.prospectoService.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  nuevoProspecto(): void {

    this.prospecto = {
      nombre: '',
      primer_apellido: '',
      calle: '',
      numero: null,
      colonia: ' ',
      codigo_postal: null,
      telefono: null,
      rfc: ' ',
      id_documento: null
    };
  }

}
