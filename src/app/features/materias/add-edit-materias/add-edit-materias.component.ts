import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
   
    )
     {
   
    
 
}

  ngOnInit(): void {
   
    
  }
  addEditMateria(){

  }
  cancelar() {
    //this.dialogRef.close(false);
  }
 

}
