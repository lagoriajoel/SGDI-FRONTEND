import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { contenido } from 'src/app/core/Entities/Contenido';
import { contenidoAdeudadoDto } from 'src/app/core/Entities/contenidoAdeudadoDto';
import { criterioDto } from 'src/app/core/Entities/criterioDTO';
import { estrategiaDto } from 'src/app/core/Entities/estrategiaDto';
import { Informes } from 'src/app/core/Entities/informe';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ContenidosService } from 'src/app/core/services/contenidos.service';
import { criterioService } from 'src/app/core/services/criterio.service';
import { estrategiaService } from 'src/app/core/services/estrategia.service';
import { InformesService } from 'src/app/core/services/informes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
interface instancia {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-form-edit-informe',
  templateUrl: './form-edit-informe.component.html',
  styleUrls: ['./form-edit-informe.component.css']
})
export class FormEditInformeComponent implements OnInit {

  //Array de contenidos adeudados por el Alumno
  contenidos: contenidoAdeudadoDto[] = [];
  contenidoActualizar!:contenidoAdeudadoDto
  contenidosDesaprobados:contenidoAdeudadoDto[] = [];
  
  NombreAlumno: string =''
  ApellidoAlumno: string =''
  NombreCurso: string =''
  NombreDivision: string =''
  email: string =''
  alumnoInforme!: Informes
  estado:boolean = false;
  idInforme!: number 
  presidenteMesa:string=''
 

  NombreProfesor: string =''
  NombreAsignatura: string =''
  dniAlumno: string =''
  cicloLectivo:string=''
  value: boolean = false;

  criterios: criterioDto[] = [];
  estrategias: estrategiaDto[] = [];

  rowHeight:number=0
  

  instancia: instancia[] = [
    {value: '-', viewValue: ''},
    {value: 'aprobado', viewValue: 'APROBADO'},
    {value: 'desaprobado', viewValue: 'DESAPROBADO'},
    {value: 'ausente', viewValue: 'AUSENTE'},
   
  ];
  instanciaSelect: string = ''

displayedColumns: string[] = ["nombre", "descripcion", "diciembre"];
  

dataSource: any;



  
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public dialogRef: MatDialogRef<FormEditInformeComponent>,
    private _contenidosService: ContenidosService,
    private _criteriosService :criterioService,
    private notificationService: NotificationService,
    private _estrategiaService :estrategiaService,
    private _informeService :InformesService,
    private auth:AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    console.log(data);
   
    this.contenidos= this.data.informe.contenidosAdeudados
   this.getContenidosDesaprobados(this.data.informe.contenidosAdeudados)
  
    this.dataSource = new MatTableDataSource<contenidoAdeudadoDto>(this.contenidosDesaprobados) 
   this.alumnoInforme=data.informe
     
   this.NombreProfesor=data.informe.profesorNombre
   this.presidenteMesa=this.auth.getName();
    this.NombreAlumno=data.alumno.nombres
    this.ApellidoAlumno=data.alumno.apellido
    this.email=data.alumno.email
    
    this.NombreAsignatura=data.NombreAsignatura
    this.NombreCurso=data.alumno.curso.anio
    this.dniAlumno=data.alumno.dni
    this.NombreDivision=data.alumno.curso.division
    this.cicloLectivo=data.alumno.curso.cicloLectivo
   this.listarCriteriosEstrategias(data.idAsignatura)
   console.log(this.contenidos);
  
  }
  getContenidosDesaprobados(contenidos: contenidoAdeudadoDto[]): any{
       
     contenidos.forEach(cont=>{
      if(!cont.aprobado){
        this.contenidosDesaprobados.push(cont);
      }
     })
    
    console.log(this.contenidosDesaprobados);
  }

  listarCriteriosEstrategias(idAsignatura: number) {
    
    this._criteriosService.listarContenidoPorAsignatura(idAsignatura).subscribe({
      next: data=>{ this.criterios=data; 
        this.rowHeight= data.length*35     
        },
      error: error=>{}
    });

    this._estrategiaService.listarContenidoPorAsignatura(idAsignatura).subscribe({
      next: data=>{this.estrategias=data; 
          if(data.length>this.criterios.length)   this.rowHeight= data.length*35 
      },
      error: error=>{}
    });
    
  }

  ngOnInit(): void {

   
       
   
  }
  cancelar() {
    this.dialogRef.close(false);
  }
  EvaluacionDiciembre(ob: MatSelectChange, id: number): void {
   
    
  }
 
 
 



  actualizarInforme(){

   
  
   this._informeService.actualizarContenidoDiciembre(this.contenidos).subscribe({
    next: data=>{
      this.notificationService.openSnackBar("Informe Actualizado Correctamente")
      console.log(data);},
    error: (err)=>{
      this.notificationService.openSnackBar(err.error.Mensaje)
      console.log(err);},

   })
   this.dialogRef.close()
  }
}
