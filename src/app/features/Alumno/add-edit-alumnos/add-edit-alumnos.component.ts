import { CursoDto } from 'src/app/core/Entities/CursoDto';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from 'src/app/core/Entities/alumno';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
import { cursoAlumno } from 'src/app/core/Entities/cursoAlumno';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Informes } from 'src/app/core/Entities/informe';
import { AlumnoDto } from 'src/app/core/Entities/AlumnoDto';


@Component({
  selector: 'app-add-edit-alumnos',
  templateUrl: './add-edit-alumnos.component.html',
  styleUrls: ['./add-edit-alumnos.component.css']
})
export class AddEditAlumnosComponent implements OnInit {

  form: FormGroup;
  deshabilitado:boolean= true
  
 
  loading: boolean;
  operacion: string = 'Agregar ';
  id: number | undefined;
  idCurso: number | undefined;
  cursoAlumno!: cursoAlumno;
  Informes: Informes[]=[]

  constructor(public dialogRef: MatDialogRef<AddEditAlumnosComponent>,
    private fb: FormBuilder, private _alumnoService: AlumnoService,
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any,
    private _cursoService: CursosService,
    private notificationService: NotificationService) {
      this.loading=false;

      
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.maxLength(10)]],
      nombres: ['', Validators.required],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      
     

      
    })

    this.id = data.id;
    this.idCurso= data.idCurso;
  
    
   

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
    this._alumnoService.detail(id).subscribe(data => {
      this.form.setValue({
        dni: data.dni,
        nombres: data.nombres,
        apellido: data.apellido,
        email: data.email,
        
       
      })
    })
  }

 

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditAlumno() {
    
    console.log(this.loading+"aca")

    if (this.form.invalid) {
      return;
    }
    const cursoAlumno: cursoAlumno= {
      idCurso: this.data.idCurso,
     
    }
   
    const alumno: AlumnoDto = {
      
      dni: this.form.value.dni,
      nombres: this.form.value.nombres,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      curso: cursoAlumno,
     informeDesempenios: this.Informes

    }

   setTimeout(()=>{  this.loading=true},0)
    
       console.log(this.loading)

    if (this.id == undefined) {

      // Es agregar
      this._alumnoService.save(alumno).subscribe(() => {
        this.mensajeExito('agregada');
        this.dialogRef.close(true)
      },
      error => {
        this.dialogRef.close(true)
        this.notificationService.openSnackBar(error.error.Mensaje);
      }
      )

    } else {

      // Es editar
      this._alumnoService.update(this.id, alumno).subscribe(data => {
        this.mensajeExito('actualizada');
        this.dialogRef.close(true)

      })
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El Alumno fue ${operacion} con exito`, '', {
      duration: 2000
    });
  }

}
