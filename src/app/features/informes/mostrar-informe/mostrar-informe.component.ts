import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { contenido } from 'src/app/core/Entities/Contenido';
import { ContenidosService } from 'src/app/core/services/contenidos.service';

@Component({
  selector: 'app-mostrar-informe',
  templateUrl: './mostrar-informe.component.html',
  styleUrls: ['./mostrar-informe.component.css']
})
export class MostrarInformeComponent implements OnInit {
  
  //Array de contenidos adeudados por el Alumno
  contenidos: contenido[] = [];
  NombreAlumno: string =''
  NombreCurso: string =''
  NombreDivision: string =''


  NombreProfesor: string =''
  NombreAsignatura: string =''
  dniAlumno: string =''
  cicloLectivo:string=''



displayedColumns: string[] = ["contenido", "descripcion", "acciones"];
  

dataSource: any;



  
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(public dialogRef: MatDialogRef<MostrarInformeComponent>,
    private _contenidosService: ContenidosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
   
    this.contenidos=this.data.infome[0].contenidosAdeudados
  
    this.dataSource = new MatTableDataSource<contenido>(this.contenidos) 
    console.log(data.alumno);
    this.NombreAlumno=data.NombreAlumno
    
    this.NombreAsignatura=data.NombreAsignatura
    this.NombreCurso=data.alumno.curso.anio
    this.dniAlumno=data.alumno.dni
    this.NombreDivision=data.alumno.curso.division
    this.cicloLectivo=data.alumno.curso.cicloLectivo
    console.log(this.NombreCurso);
  
  }

  ngOnInit(): void {

   
       
   
  }

  generarPDF(){
    
  }
  
}
