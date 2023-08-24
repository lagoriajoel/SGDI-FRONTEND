import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { contenidoAdeudadoDto } from "src/app/core/Entities/contenidoAdeudadoDto";
import { contenidoInformeDto } from "src/app/core/Entities/contenidoInformeDto";
import { criterioDto } from "src/app/core/Entities/criterioDTO";
import { estrategiaDto } from "src/app/core/Entities/estrategiaDto";
import { Informes } from "src/app/core/Entities/informe";
import { InformeContenidoDto } from "src/app/core/Entities/informeContenidosDto";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { ContenidosService } from "src/app/core/services/contenidos.service";
import { criterioService } from "src/app/core/services/criterio.service";
import { estrategiaService } from "src/app/core/services/estrategia.service";
import { InformesService } from "src/app/core/services/informes.service";
import { NotificationService } from "src/app/core/services/notification.service";

interface instancia {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-form-edit-informe",
  templateUrl: "./form-edit-informe.component.html",
  styleUrls: ["./form-edit-informe.component.css"],
})
export class FormEditInformeComponent implements OnInit {
  contenidos: contenidoAdeudadoDto[] = [];
  contenidoActualizar!: contenidoAdeudadoDto;
  contenidosDesaprobados: contenidoAdeudadoDto[] = [];
  form: FormGroup;
  NombreAlumno: string = "";
  ApellidoAlumno: string = "";
  NombreCurso: string = "";
  NombreDivision: string = "";
  email: string = "";
  alumnoInforme!: Informes;
  estado: boolean = false;
  idInforme!: number;
  informeActualizado!: InformeContenidoDto;
  presidenteMesa: string = "";
  fechaMesa!: Date;
  contenidosInforme: contenidoInformeDto[] = [];

  NombreProfesor: string = "";
  NombreAsignatura: string = "";
  dniAlumno: string = "";
  cicloLectivo: string = "";
  value: boolean = false;

  criterios: criterioDto[] = [];
  estrategias: estrategiaDto[] = [];

  rowHeight: number = 0;

  instancia: instancia[] = [
    { value: "-", viewValue: "" },
    { value: "aprobado", viewValue: "APROBADO" },
    { value: "desaprobado", viewValue: "DESAPROBADO" },
    { value: "ausente", viewValue: "AUSENTE" },
  ];
  instanciaSelect: string = "";

  displayedColumns: string[] = ["nombre", "InstanciaEvaluacion"];

  dataSource: any;

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public datepipe: DatePipe,
    public dialogRef: MatDialogRef<FormEditInformeComponent>,
    private fb: FormBuilder,
    private _criteriosService: criterioService,
    private notificationService: NotificationService,
    private _estrategiaService: estrategiaService,
    private _informeService: InformesService,
    private auth: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      Fecha: ["", [Validators.required]],
    });

    this.contenidos = this.data.informe.contenidosAdeudados;
    this.getContenidosDesaprobados(this.data.informe.contenidosAdeudados);

    this.dataSource = new MatTableDataSource<contenidoAdeudadoDto>(
      this.contenidosDesaprobados
    );
    this.alumnoInforme = data.informe;
    console.log(this.alumnoInforme);

    this.NombreProfesor = data.informe.profesorNombre;
    this.presidenteMesa = this.auth.getName();
    this.NombreAlumno = data.alumno.nombres;
    this.ApellidoAlumno = data.alumno.apellido;
    this.email = data.alumno.email;
    this.NombreAsignatura = data.NombreAsignatura;
    this.NombreCurso = data.alumno.curso.anio;
    this.dniAlumno = data.alumno.dni;
    this.NombreDivision = data.alumno.curso.division;
    this.cicloLectivo = data.alumno.curso.cicloLectivo;
    this.listarCriteriosEstrategias(data.idAsignatura);

    this.getContenidosInformeMesaDto(this.contenidos);
  }

  //metodo para instanciar los contenidosDTO para enviar al back
  getContenidosInformeMesaDto(contenidos: contenidoAdeudadoDto[]): void {
    contenidos.forEach((contenido) => {
      const contenidoInf: contenidoInformeDto = {
        id: contenido.id,
        instanciaEvaluacion: "",
        aprobado: contenido.aprobado,
      };
      this.contenidosInforme.push(contenidoInf);
    });
  }
  getContenidosDesaprobados(contenidos: contenidoAdeudadoDto[]): any {
    contenidos.forEach((cont) => {
      if (!cont.aprobado) {
        this.contenidosDesaprobados.push(cont);
      }
    });
  }

  listarCriteriosEstrategias(idAsignatura: number) {
    this._criteriosService
      .listarContenidoPorAsignatura(idAsignatura)
      .subscribe({
        next: (data) => {
          this.criterios = data;
          this.rowHeight = data.length * 35;
        },
        error: (error) => {},
      });

    this._estrategiaService
      .listarContenidoPorAsignatura(idAsignatura)
      .subscribe({
        next: (data) => {
          this.estrategias = data;
          if (data.length > this.criterios.length)
            this.rowHeight = data.length * 35;
        },
        error: (error) => {},
      });
  }

  ngOnInit(): void {}
  cancelar() {
    this.dialogRef.close(false);
  }

  //evaluar instancias de evaluacion
  EvaluacionMesa(ob: MatSelectChange, id: number): void {
    if (ob.value == "aprobado") {
      this.contenidosInforme.forEach((contenido) => {
        if (contenido.id == id) {
          contenido.instanciaEvaluacion = "aprobado";
          contenido.aprobado = true;
        }
      });
      console.log(this.contenidosInforme);
    }
    if (ob.value == "desaprobado") {
      this.contenidosInforme.forEach((contenido) => {
        if (contenido.id == id) {
          contenido.instanciaEvaluacion = "desaprobado";
          contenido.aprobado = false;
        }
      });
      console.log(this.contenidosInforme);
    }
    if (ob.value == "ausente") {
      this.contenidosInforme.forEach((contenido) => {
        if (contenido.id == id) {
          contenido.instanciaEvaluacion = "ausente";
          contenido.aprobado = false;
        }
      });
      console.log(this.contenidos);
    }
  }

  actualizarInforme() {
    //buscar el informe y actualizar instancia de evaluacion y fecha de evaluacion
    if (this.form.invalid) {
      return;
    }
    const informe: InformeContenidoDto = {
      id: this.alumnoInforme.id,
      fecha_instancia: this.datepipe.transform(
        this.form.value.Fecha,
        "dd/MM/yyyy"
      )!,
      presidente_mesa_instancia: this.presidenteMesa,
    };

    console.log(this.contenidosInforme);

    this._informeService
      .actualizarInformeMesa(informe, this.alumnoInforme.id)
      .subscribe({
        next: (data) => {
          this._informeService
            .actualizarContenidoExamen(this.contenidosInforme)
            .subscribe({
              next: (data) => {
                this.notificationService.openSnackBar(
                  "Informe Actualizado Correctamente"
                );
                
              },
            });
        },
        error: (err) => {
          this.notificationService.openSnackBar(err.error.Mensaje);
          console.log(err);
        },
      });
    this.dialogRef.close();
  }
}
