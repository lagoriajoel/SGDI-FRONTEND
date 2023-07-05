import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { estrategiaDto } from 'src/app/core/Entities/estrategiaDto';
import { MateriaContenido } from 'src/app/core/Entities/materiaContenido';
import { estrategiaService } from 'src/app/core/services/estrategia.service';
import { MateriasService } from 'src/app/core/services/materias.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-edit-estrategias',
  templateUrl: './add-edit-estrategias.component.html',
  styleUrls: ['./add-edit-estrategias.component.css']
})
export class AddEditEstrategiasComponent implements OnInit {
  form: FormGroup;

  loading: boolean = false;
  operacion: string = "Agregar ";
  id: number | undefined;
  idMateria: number;

  constructor(
    public dialogRef: MatDialogRef<AddEditEstrategiasComponent>,
    private fb: FormBuilder,
    private materiaService: MateriasService,
    private estrategiasService: estrategiaService,
    private notificationService: NotificationService,
   
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      estrategias: ["", [Validators.required]],
    
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
      this.getEstrategias(id);
      
    }
  }

  getEstrategias(id: number) {
        
   this.estrategiasService.detail(id).subscribe({ 
    next: data=>{  
      console.log(data);
      this.form.setValue({
    
        estrategias: data.estrategias
  
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

    const estrategia: estrategiaDto = {
       id:0,
      estrategias: this.form.value.estrategias,
      asignatura: materia
    };

    this.loading = true;
    if (this.id == undefined) {
      // Es agregar
      this.estrategiasService.save(estrategia).subscribe(
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
      this.estrategiasService.update(this.id, estrategia).subscribe((data) => {
        this.mensajeExito("actualizado");
        this.dialogRef.close(true);
      });
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`La estrategia fue ${operacion} con exito`, "", {
      duration: 2000,
    });
  }
}


