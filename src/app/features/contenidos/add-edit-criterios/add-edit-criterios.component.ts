import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { criterio } from 'src/app/core/Entities/criterio';
import { criterioDto } from 'src/app/core/Entities/criterioDTO';
import { MateriaContenido } from 'src/app/core/Entities/materiaContenido';
import { criterioService } from 'src/app/core/services/criterio.service';
import { MateriasService } from 'src/app/core/services/materias.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-edit-criterios',
  templateUrl: './add-edit-criterios.component.html',
  styleUrls: ['./add-edit-criterios.component.css']
})
export class AddEditCriteriosComponent implements OnInit {
  form: FormGroup;

  loading: boolean = false;
  operacion: string = "Agregar ";
  id: number | undefined;
  idMateria: number;

  constructor(
    public dialogRef: MatDialogRef<AddEditCriteriosComponent>,
    private fb: FormBuilder,
    private materiaService: MateriasService,
    private criteriosService: criterioService,
    private notificationService: NotificationService,
   
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      criterio: ["", [Validators.required]],
    
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
      this.getCriterios(id);
      
    }
  }

  getCriterios(id: number) {
        
   this.criteriosService.detail(id).subscribe({ 
    next: data=>{  
      console.log(data);
      this.form.setValue({
    
      criterio: data.criterio,
    
     
    
  
    })
  },
  error: (error) => {
    this.notificationService.openSnackBar(error.error)
  }

   })
  }

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

    const criterios: criterioDto = {
       id:0,
      criterio: this.form.value.criterio,
      asignatura: materia
    };

    this.loading = true;
    if (this.id == undefined) {
      // Es agregar
      this.criteriosService.save(criterios).subscribe(
        {
          next: () => {
        this.mensajeExito("agregado");
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.notificationService.openSnackBar(error.error.Mensaje)
      }
        }
      );
    } else {
      // Es editar
      this.criteriosService.update(this.id, criterios).subscribe((data) => {
        this.mensajeExito("actualizado");
        this.dialogRef.close(true);
      });
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`el criterio fue ${operacion} con exito`, "", {
      duration: 2000,
    });
  }
}

