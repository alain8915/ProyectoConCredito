import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ProspectoService } from 'src/app/services/prospecto-service.service';
import { Router } from '@angular/router';
import { Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatosProspecto } from 'src/app/models/datosProspecto.model';


@Component({
  selector: 'app-lista-prospectos',
  templateUrl: './lista-prospectos.component.html',
  styleUrls: ['./lista-prospectos.component.css']
})
export class ListaProspectosComponent implements OnInit, OnDestroy {
  prospectos: any;
  currentProspecto: DatosProspecto = new DatosProspecto();
  currentIndex = -1;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private prospectoService: ProspectoService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerProspectos();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  obtenerProspectos(): void {
    this.prospectoService.getAll().pipe(takeUntil(this.unsubscribe))
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
    this.currentProspecto = new DatosProspecto();
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
    this.prospectoService.deleteAll().pipe(takeUntil(this.unsubscribe))
      .subscribe(
        response => {
          console.log(response);
          this.obtenerProspectos();
        },
        error => {
          console.log(error);
        });
  }

}
