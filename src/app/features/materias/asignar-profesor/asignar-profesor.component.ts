import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, Routes } from '@angular/router';
import { Profesor } from 'src/app/core/Entities/profesor';
import { MateriasService } from 'src/app/core/services/materias.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';

@Component({
  selector: 'app-asignar-profesor',
  templateUrl: './asignar-profesor.component.html',
  styleUrls: ['./asignar-profesor.component.css']
})
export class AsignarProfesorComponent implements OnInit {

  loading: boolean=false
  profesores:Profesor[]=[];
  idProfesor: number=0
  idAsignatura: number=0
 
   displayedColumns: string[] = ["dni","nombre","apellido","email","acciones"];
   dataSource = new MatTableDataSource(this.profesores);
  
   @ViewChild(MatSort, { static: true })
   sort: MatSort = new MatSort();
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  titleService: any;
  constructor( 
    public dialogRef: MatDialogRef<AsignarProfesorComponent>,
    private profesorService: ProfesorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _materiaService: MateriasService,
    private _router: Router
   
    ) { 
    this.dataSource = new MatTableDataSource();
    this.idAsignatura = data.idAsignatura; 
    
  }

  ngOnInit(): void {
  
    this.dataSource.sort = this.sort;
    this.cargarProfesores();
  }
  cargarProfesores(): void {
    
    this.profesorService.lista().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
    })
    
  }
  //seleccionar un profesor de la lista
  selectedRowIndex = -1;
  selectRow(profesor : Profesor) {
    this.selectedRowIndex = profesor.id;
    this.idProfesor=profesor.id;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  cancelar() {

    this.dialogRef.close(false);
  }
  aceptar(){
    this.dialogRef.close(false);
    
    
    this._router.navigate([`/materias/detalles/${this.idAsignatura}`] ,{ 
      queryParams: {
        profesor:this.idProfesor
      }
   } );

  }

}
