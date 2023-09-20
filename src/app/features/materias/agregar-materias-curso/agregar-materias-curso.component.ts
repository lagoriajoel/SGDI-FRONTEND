import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlumnoDto } from "src/app/core/Entities/AlumnoDto";
import { CursoDto } from "src/app/core/Entities/CursoDto";
import { cursoAlumno } from "src/app/core/Entities/cursoAlumno";
import { CursoInforme } from "src/app/core/Entities/cursoInforme";
import { Informes } from "src/app/core/Entities/informe";
import { MateriasCursoDto } from "src/app/core/Entities/materiaCursoDto";
import { MateriasDto } from "src/app/core/Entities/materias";
import { AlumnoService } from "src/app/core/services/alumno.service";
import { CursosService } from "src/app/core/services/cursos/cursos.service";
import { MateriasService } from "src/app/core/services/materias.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-agregar-materias-curso",
  templateUrl: "./agregar-materias-curso.component.html",
  styleUrls: ["./agregar-materias-curso.component.css"],
})
export class AgregarMateriasCursoComponent implements OnInit {
  form: FormGroup;
  deshabilitado: boolean = true;

  loading: boolean;
  operacion: string = "Agregar ";
  id: number | undefined;
  idCurso: number | undefined;
  cursoAlumno!: cursoAlumno;
  curso!: CursoDto
  anioCurso: string | undefined;
  divisionCurso: string | undefined;
  tecnicaturaCurso: string | undefined;

  Informes: Informes[] = [];

  constructor(
    public dialogRef: MatDialogRef<AgregarMateriasCursoComponent>,
    private fb: FormBuilder,
    private _alumnoService: AlumnoService,
    private _materiasService: MateriasService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cursoService: CursosService,
    private notificationService: NotificationService
  ) {
    this.loading = false;

    this.form = this.fb.group({
      nombre: ["", [Validators.required, Validators.maxLength(50)]],
    });

    this.id = data.id;
    this.idCurso = Number(data.idCurso);
    console.log(data.idCurso+"  agregar materia");
  }

  ngOnInit(): void {
    this.esEditar(this.id);
    this._cursoService.detail(this.idCurso!).subscribe({
      next: data=>{
        console.log(data);
        this.curso=data
        this.anioCurso=data.anio
        this.divisionCurso=data.division
        this.tecnicaturaCurso = data.tecnicatura

      }
    })

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

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditAlumno() {
    if (this.form.invalid) {
      return;
    }
    const cursoAlumno: CursoInforme = {
      id: this.data.idCurso,
    };

    const materiaNueva: MateriasCursoDto = {
     asignatura_id: 0,
      nombre: this.form.value.nombre,
      anioCurso: this.anioCurso!,
      curso: cursoAlumno!,
      profesor: null,
    };

    setTimeout(() => {
      this.loading = true;
    }, 0);

    console.log(this.loading);

    if (this.id == undefined) {
      // Es agregar
      this._materiasService.save(materiaNueva).subscribe(
        () => {
          this.mensajeExito("agregada");
          this.dialogRef.close(true);
        },
        (error) => {
          this.dialogRef.close(true);
          this.notificationService.openSnackBar(error.error.Mensaje);
        }
      );
    } else {
      // Es editar
    
     
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El espacio curricular fue ${operacion} con exito`, "", {
      duration: 2000,
    });
  }
}
