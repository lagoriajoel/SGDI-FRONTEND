import { contenido } from "./../../../core/Entities/Contenido";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MateriaContenido } from "src/app/core/Entities/materiaContenido";
import { ContenidosService } from "src/app/core/services/contenidos.service";

@Component({
  selector: "app-add-edit-contenidos",
  templateUrl: "./add-edit-contenidos.component.html",
  styleUrls: ["./add-edit-contenidos.component.css"],
})
export class AddEditContenidosComponent implements OnInit {
  form: FormGroup;

  loading: boolean = false;
  operacion: string = "Agregar ";
  id: number | undefined;
  idMateria: number;

  constructor(
    public dialogRef: MatDialogRef<AddEditContenidosComponent>,
    private fb: FormBuilder,
    private _contenidoService: ContenidosService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      descripcion: ["", [Validators.required]],
    });

    this.id = data.id;
    this.idMateria = data.idAsignatura;
    console.log(this.idMateria);
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = "Editar ";
      this.getCurso(id);
    }
  }

  getCurso(id: number) {}

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditContenido() {
    if (this.form.invalid) {
      return;
    }
    const materia: MateriaContenido = {
      asignatura_id: this.idMateria
    };

    const contenido: contenido = {
      id: 0,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      asignatura: materia
    };

    this.loading = true;
    if (this.id == undefined) {
      // Es agregar
      this._contenidoService.save(contenido).subscribe(() => {
        this.mensajeExito("agregada");
        this.dialogRef.close(true);
      });
    } else {
      // Es editar
      this._contenidoService.update(this.id, contenido).subscribe((data) => {
        this.mensajeExito("actualizada");
        this.dialogRef.close(true);
      });
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`La persona fue ${operacion} con exito`, "", {
      duration: 2000,
    });
  }
}
