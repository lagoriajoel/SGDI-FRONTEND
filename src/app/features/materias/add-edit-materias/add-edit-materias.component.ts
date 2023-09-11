import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
import { MateriasService } from 'src/app/core/services/materias.service';
import { NotificationService } from 'src/app/core/services/notification.service';


interface turno {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-edit-materias',
  templateUrl: './add-edit-materias.component.html',
  styleUrls: ['./add-edit-materias.component.css']
})
export class AddEditMateriasComponent implements OnInit {


  form: FormGroup;
  deshabilitado:boolean= true
  
 
  loading: boolean;
  operacion: string = 'Agregar ';
  id: number | undefined;
  idCurso: number | undefined;
  
 

  constructor(public dialogRef: MatDialogRef<AddEditMateriasComponent>,
    private fb: FormBuilder, private materiaService: MateriasService,
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
      this.getMateria(id);
    }
  }

  getMateria(id: number) {
    this.materiaService.detail(id).subscribe(data => {
      this.form.setValue({
        
       
      })
    })
  }

 

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditMateria() {
  }

}
