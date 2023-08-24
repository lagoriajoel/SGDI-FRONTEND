import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddEditAlumnosComponent } from '../../Alumno/add-edit-alumnos/add-edit-alumnos.component';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Profesor } from 'src/app/core/Entities/profesor';

@Component({
  selector: 'app-add-edit-profesores',
  templateUrl: './add-edit-profesores.component.html',
  styleUrls: ['./add-edit-profesores.component.css']
})
export class AddEditProfesoresComponent implements OnInit {
  form: FormGroup;
  deshabilitado:boolean= true
  
 
  loading: boolean;
  operacion: string = 'Agregar ';
  id: number | undefined;
  idCurso: number | undefined;
  

  constructor(public dialogRef: MatDialogRef<AddEditProfesoresComponent>,
    private fb: FormBuilder, private _profesorService: ProfesorService,
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService) {
      this.loading=false;

      
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.maxLength(10)]],
      nombre: ['', Validators.required],
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
      this.getProfesor(id);
    }
  }

  getProfesor(id: number) {
    this._profesorService.detail(id).subscribe(data => {
      console.log(data);
      this.form.setValue({
        dni: data.dni,
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
              
      })
    })
  }

 

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditAlumno() {
    
    if (this.form.invalid) {
      return console.log("form invalido");;
    }
   
   
    const profesor: Profesor = {
      id: 0,
      dni: this.form.value.dni,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      nombreCompleto:"",
      asignaturas: []

    

    }

   setTimeout(()=>{  this.loading=true},0)
    
       console.log(this.loading)

    if (this.id == undefined) {

      // Es agregar
      this._profesorService.save(profesor).subscribe(() => {
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
      this._profesorService.update(this.id, profesor).subscribe(data => {
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
