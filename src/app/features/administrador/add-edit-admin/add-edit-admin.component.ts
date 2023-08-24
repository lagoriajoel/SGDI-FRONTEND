import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Administrador } from 'src/app/core/Entities/administrador';
import { AdministradorService } from 'src/app/core/services/administrador.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-edit-admin',
  templateUrl: './add-edit-admin.component.html',
  styleUrls: ['./add-edit-admin.component.css']
})
export class AddEditAdminComponent implements OnInit {
  form: FormGroup;
  deshabilitado:boolean= true
  
 
  loading: boolean;
  operacion: string = 'Agregar ';
  id: number | undefined;
  idCurso: number | undefined;
  

  constructor(public dialogRef: MatDialogRef<AddEditAdminComponent>,
    private fb: FormBuilder, private _adminService: AdministradorService,
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
    this._adminService.detail(id).subscribe(data => {
      this.form.setValue({
        dni: data.dni,
        nombre: data.nombres,
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
   
   
    const profesor: Administrador = {
      id: 0,
      dni: this.form.value.dni,
      nombres: this.form.value.nombre,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      
    

    }

   setTimeout(()=>{  this.loading=true},0)
    
       console.log(this.loading)

    if (this.id == undefined) {

      // Es agregar
      this._adminService.save(profesor).subscribe(
        {
          next: data=>{
            console.log(data);
            this.dialogRef.close(true)

          }
        
      ,
      error: error => {
        this.dialogRef.close(true)
        this.notificationService.openSnackBar(error.error.Mensaje);
      }
    })

    } else {

      // Es editar
      this._adminService.update(this.id, profesor).subscribe(data => {
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
