import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  MatDialog } from '@angular/material/dialog';
import { CursoDto } from 'src/app/core/Entities/CursoDto';
import { MateriasService } from 'src/app/core/services/materias.service';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignarProfesorComponent } from '../asignar-profesor/asignar-profesor.component';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-detalle-materia',
  templateUrl: './detalle-materia.component.html',
  styleUrls: ['./detalle-materia.component.css']
})
export class DetalleMateriaComponent implements OnInit {

 
  selectedValue!: string;
  curso!: CursoDto;
  idAsignatura:number=0
  idProfesor:number=0
  NombreMateria: string=''
  anioMateria: string=''
  divisionMateria: string=''
  NombreProfesor: string=''
  cicloLectivoMateria: string=''

  
 
  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number;
  

  constructor(
    private fb: FormBuilder, private _materiasService: MateriasService,
    private _routes :ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _cursorService: CursosService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _profesorService: ProfesorService,
    private _notificacionService: NotificationService

    )
     {
   
      this.id= Number(this._routes.snapshot.paramMap.get("id"))!
      console.log('id numero  '+ this.id);
      this._materiasService.detail(this.id).subscribe(data=>{
        console.log(data);
        this.NombreMateria=data.nombre;
        this.anioMateria = data.curso.anio;
        this.divisionMateria = data.curso.division;
        this.cicloLectivoMateria  = data.curso.cicloLectivo;
        this.idAsignatura=data.asignatura_id
        this._profesorService.listarPorMateria(data.asignatura_id).subscribe(
          {
            next: data => {

              this.NombreProfesor=data.nombreCompleto
             
             },
             error: (err) => {
              this._notificacionService.openSnackBar(err.error.Mensaje);
             }
          }
          );
      })
   
    
  }

  ngOnInit(): void {
    
   
    this._route.queryParamMap.subscribe((params) => {
      if(params.get("profesor")) {
        let prof=params.get("profesor");

        this._profesorService.detail(Number(prof)!).subscribe({
          next: data=> {
            this.NombreProfesor=data.nombreCompleto
            this.idProfesor=data.id
            
          }
        })
      }
      

    });

    
   
  }
  asignarProfesor(){
    const dialogRef = this.dialog.open(AsignarProfesorComponent, {
      width: "700px",
      disableClose: true,
         data: {
          idAsignatura: this.idAsignatura
         }
    
    });
  }
  
  aceptar(){
     this._materiasService.asignarAsignatura(this.idProfesor, this.idAsignatura).subscribe({
      next: data=>{
        console.log("ok");
        this._router.navigate(["/materias/mostrar"]);
        
      },
    error: error=>{
      this._snackBar.open(error.error.Mensaje);
    }   })
  }
  cancelar() {
    
    this._router.navigate(["/materias/mostrar"]);
  }



 

  mensajeExito(operacion: string) {
    this._snackBar.open(`El espacio Curricular fue ${operacion} con exito`, '', {
      duration: 2000
    });
  }
}
