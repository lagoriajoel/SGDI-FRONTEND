
import { CursosService } from './../../../../core/services/cursos/cursos.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  anios: turno[] = [
    {value: '1', viewValue: '1°'},
    {value: '2', viewValue: '2°'},
    {value: '3', viewValue: '3°'},
    {value: '4', viewValue: '4°'},
    {value: '5', viewValue: '5°'},
    {value: '6', viewValue: '6°'},
  ];

  tecnicaturas: turno[] = [
    {value: '---', viewValue: '---'},
    {value: 'EIE', viewValue: 'E.I.E'},
    {value: 'MMO', viewValue: 'M.M.O'},
    {value: 'IP', viewValue: 'I.P'},
    {value: 'IPP', viewValue: 'I.P.P'},
   
  ];
  divisiones: turno[] = [
    {value: 'A', viewValue: 'A'},
    {value: 'B', viewValue: 'B'},
    {value: 'C', viewValue: 'C'},
    {value: 'D', viewValue: 'D'},
    {value: 'E', viewValue: 'E'},
    {value: 'F', viewValue: 'F'},
    {value: 'G', viewValue: 'G'},
    {value: 'H', viewValue: 'H'},
    {value: 'I', viewValue: 'I'},

  ];
 
  selectedValue!: string;
 
  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number | undefined;

  constructor(public dialogRef: MatDialogRef<AddEditCursoComponent>,
    private fb: FormBuilder, private _cursoService: CursosService,
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
   
    this.form = this.fb.group({
      anio: ['', Validators.required],
      division: ['', Validators.required],
      tecnicatura:['', Validators.required],
      turno:['', Validators.required],
      cicloLectivo: ['', [Validators.required]],
      
    })
    this.id = data.id;

  }



  ngOnInit(): void {
    this.esEditar(this.id);
   
  }

  // metodo para editar

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar ';
      this.getCurso(id);
    }
  }

  // se obtiene el curso para poder editarlo

  getCurso(id: number) {
    this._cursoService.detail(id).subscribe(data => {
      this.form.setValue({
        anio: data.anio,
        division: data.division,
        tecnicatura: data.tecnicatura,
        turno: data.turno,
        cicloLectivo: data.cicloLectivo
       
      })
    })
  }

  cancelar() {
    this.dialogRef.close(false);
  }

   
  addEditCurso() {

    if (this.form.invalid) {
      return console.log("error");;
    }
   
    const curso: CursoDto = {
      idCurso: 0,
      anio: this.form.value.anio,
      division: this.form.value.division,
      tecnicatura: this.form.value.tecnicatura,
      turno: this.form.value.turno,
      cicloLectivo: this.form.value.cicloLectivo
    }

     this.loading=true
    if (this.id == undefined) {

      // Es agregar
      this._cursoService.save(curso).subscribe(() => {
        this.mensajeExito('agregado');
        this.dialogRef.close(true)
      })

    } else {

      // Es editar
      this._cursoService.update(this.id, curso).subscribe(data => {
        this.mensajeExito('actualizado');
        this.dialogRef.close(true)

      })
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El curso fue ${operacion} con exito`, '', {
      duration: 2000
    });
  }


}
