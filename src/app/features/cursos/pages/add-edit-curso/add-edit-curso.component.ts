
import { CursosService } from './../../../../core/services/cursos/cursos.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoDto } from 'src/app/core/Entities/CursoDto';


interface turno {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-edit-curso',
  templateUrl: './add-edit-curso.component.html',
  styleUrls: ['./add-edit-curso.component.css']
})
export class AddEditCursoComponent implements OnInit {

 
  form: FormGroup;
  turnos: turno[] = [
    {value: 'mañana', viewValue: 'MAÑANA'},
    {value: 'tarde', viewValue: 'TARDE'},
    {value: 'noche', viewValue: 'NOCHE'},
  ];
 
  selectedValue!: string;
 
  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number | undefined;

  constructor(public dialogRef: MatDialogRef<AddEditCursoComponent>,
    private fb: FormBuilder, private _cursoService: CursosService,
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
   
    this.form = this.fb.group({
      anio: ['', [Validators.required, Validators.maxLength(20)]],
      division: ['', Validators.required],
      cicloLectivo: ['', [Validators.required]],
      
    })
    this.id = data.id;

  }

  ngOnInit(): void {
    this.esEditar(this.id);
   
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar ';
      this.getCurso(id);
    }
  }

  getCurso(id: number) {
    this._cursoService.detail(id).subscribe(data => {
      this.form.setValue({
        anio: data.anio,
        division: data.division,
        cicloLectivo: data.cicloLectivo
       
      })
    })
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditCurso() {

    if (this.form.invalid) {
      return;
    }
   
    const curso: CursoDto = {
      idCurso: 0,
      anio: this.form.value.anio,
      division: this.form.value.division,
      turno: this.selectedValue,
      cicloLectivo: this.form.value.cicloLectivo
    }

     this.loading=true
    if (this.id == undefined) {

      // Es agregar
      this._cursoService.save(curso).subscribe(() => {
        this.mensajeExito('agregada');
        this.dialogRef.close(true)
      })

    } else {

      // Es editar
      this._cursoService.update(this.id, curso).subscribe(data => {
        this.mensajeExito('actualizada');
        this.dialogRef.close(true)

      })
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`La persona fue ${operacion} con exito`, '', {
      duration: 2000
    });
  }


}
