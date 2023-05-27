import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cursoAlumno } from "src/app/core/Entities/cursoAlumno";
import { Informes } from "src/app/core/Entities/informe";
import { AddEditAlumnosComponent } from "../../Alumno/add-edit-alumnos/add-edit-alumnos.component";
import { AlumnoService } from "src/app/core/services/alumno.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CursosService } from "src/app/core/services/cursos/cursos.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { Alumno } from "src/app/core/Entities/alumno";
import { contenido } from "src/app/core/Entities/Contenido";
import { AlumnoInforme } from "src/app/core/Entities/alumnoInforme";
import { MatTableDataSource } from "@angular/material/table";
import { ContenidosService } from "src/app/core/services/contenidos.service";
import { InformesService } from "src/app/core/services/informes.service";
import { CursoInforme } from "src/app/core/Entities/cursoInforme";
import { MateriaContenido } from "src/app/core/Entities/materiaContenido";

@Component({
  selector: "app-add-edit-informes",
  templateUrl: "./add-edit-informes.component.html",
  styleUrls: ["./add-edit-informes.component.css"],
})
export class AddEditInformesComponent implements OnInit {
  form: FormGroup;

  //Array de contenidos adeudados por el Alumno
  contenidos: contenido[] = [];

  loading: boolean = false;
  operacion: string = "Agregar ";
  idAlumno: number;
  idCurso: number;
  idAsignatura: number;
  informeDesempeño!: Informes;

  cursoInforme!: cursoAlumno;

  alumnoInforme!: AlumnoInforme;
  cursoAlumno!: cursoAlumno;
  idInforme: number = 0;

  displayedColumns: string[] = ["nombre", "descripcion", "acciones"];
  dataSource = new MatTableDataSource(this.contenidos);

    constructor(
      public dialogRef: MatDialogRef<AddEditInformesComponent>,
      private fb: FormBuilder,
      private _alumnoService: AlumnoService,
      private _snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _cursoService: CursosService,
      private _contenidosService: ContenidosService,
      private _informesService: InformesService,
      private notificationService: NotificationService
    ) {

    this.form = this.fb.group({
      dni: ["", [Validators.required, Validators.maxLength(10)]],
      nombres: ["", Validators.required],
      apellido: ["", [Validators.required]],
      email: ["", [Validators.required]],
    });

    this.idAlumno = data.idAlumno;
    this.idCurso = data.idCurso;
    this.idAsignatura = data.idAsignatura;

    console.log(this.idAlumno);
    console.log(this.idAsignatura);
   

    this.listarContenidos(this.idAsignatura);
  }

    ngOnInit(): void {
      this.esEditar(this.idAlumno);

    }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = "Editar ";
      this.getCurso(id);
    }
  }

  getCurso(id: number) {
    this._alumnoService.detail(id).subscribe((data) => {
      this.form.setValue({
        dni: data.dni,
        nombres: data.nombres,
        apellido: data.apellido,
        email: data.email,
      });
    });
  }
  //metodo que lista todos los contenidos de la Asignatura
  listarContenidos(idAsignatura: number) {
    let id = idAsignatura;
    this._contenidosService
      .listarContenidoPorAsignatura(id)
      .subscribe((data) => {
        
      
        this.dataSource.data = data;
      
        this.contenidos = data;
       
      });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
  //metodo que genera un informe de desempeño y lo actualiza con los contenidos
  generarInforme() {
    const alumnoInf: AlumnoInforme = {
      id: this.idAlumno,
    };
   
    

    const informeNuevo: Informes = {
      descripcion: "",
      alumno: alumnoInf,
      id_asignatura: Number(this.idAsignatura),
      contenidosAdeudados: [],
    };

  

    this._informesService.save(informeNuevo).subscribe({
      
     next: (data) => {
     
      this.idInforme = data.id;
    
      this.contenidos.forEach((element) => {
        this._informesService
          .asignarContenido(this.idInforme, element.id)
          .subscribe(
            (data) => {
              console.log(data);
            },
            (error) => {
              this.dialogRef.close(true);
              this.notificationService.openSnackBar(error.error.Mensaje);
            }
          );
      });
    },
    error: (error) => {
          this.dialogRef.close(true);
          this.notificationService.openSnackBar(error.error.Mensaje);
        },
  
  
  });
    this.mensajeExito("actualizada");
    this.dialogRef.close(true);
  }

  //eliminar contenido de la tabla
  deleteContenido(idContenido: number) {
    let idCont = idContenido;

    console.log(this.contenidos);

    const index = this.contenidos.findIndex((x) => x.id === idCont);

    this.contenidos.splice(index, 1);
    console.log(this.contenidos);

    this.dataSource = new MatTableDataSource(this.contenidos);
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El informe fue ${operacion} con exito`, "", {
      duration: 2000,
    });
  }
}
