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
  selector: 'app-mostrar-i-informe-febrero',
  templateUrl: './mostrar-i-informe-febrero.component.html',
  styleUrls: ['./mostrar-i-informe-febrero.component.css']
})
export class MostrarIInformeFebreroComponent implements OnInit {
 
  //Array de contenidos adeudados por el Alumno
  contenidos: contenidoAdeudadoDto[] = [];
  contenidoActualizar!:contenidoAdeudadoDto
  contneidosActualizados:contenidoAdeudadoDto[] = [];
  
  NombreAlumno: string =''
  ApellidoAlumno: string =''
  NombreCurso: string =''
  NombreDivision: string =''
  email: string =''
  alumnoInforme!: Informes
  estado:boolean = false;
  idInforme!: number 
 

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

displayedColumns: string[] = ["nombre", "descripcion","estado", "febrero"];
  

dataSource: any;



  
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(public dialogRef: MatDialogRef<MostrarIInformeFebreroComponent>,
    private _contenidosService: ContenidosService,
    private notificationService: NotificationService,
    private _criteriosService :criterioService,
    private _estrategiaService :estrategiaService,
    private _informeService :InformesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
   
    this.contenidos=this.data.informe.contenidosAdeudados
  
    this.dataSource = new MatTableDataSource<contenido>(this.contenidos) 
   this.alumnoInforme=data.informe
   this.value=data.value
     
   
 
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
  
  EvaluacionFebrero(ob: MatSelectChange, id: number): void {
      
    if(ob.value =="aprobado"){
      this.contenidos.forEach(contenido=>{
        if(contenido.id==id){
          contenido.instanciaEvaluacion_febrero="aprobado"
          contenido.aprobado=true;
        }
      })
     console.log(this.contenidos);
    }
    if(ob.value =="desaprobado"){
      this.contenidos.forEach(contenido=>{
        if(contenido.id==id){
          contenido.instanciaEvaluacion_febrero="desaprobado"
          contenido.aprobado=false;
        }
      })
      console.log(this.contenidos);
   }
   if(ob.value =="ausente"){
    this.contenidos.forEach(contenido=>{
      if(contenido.id==id){
        contenido.instanciaEvaluacion_febrero="ausente"
        contenido.aprobado=false;
      }
    })
    console.log(this.contenidos);
 }
    
  }

  actualizarInforme(){

   
  
   this._informeService.actualizarContenidoFebrero(this.contenidos).subscribe({
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
