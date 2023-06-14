import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoDto } from 'src/app/core/Entities/CursoDto';
import { MateriasDto } from 'src/app/core/Entities/materias';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
import { MateriasService } from 'src/app/core/services/materias.service';


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

 

  constructor(
    private fb: FormBuilder, private _materiasService: MateriasService,
    private _snackBar: MatSnackBar, 
    private _cursorService: CursosService
    )
     {
   
    
  }

  ngOnInit(): void {
   
    
  }

 

}
