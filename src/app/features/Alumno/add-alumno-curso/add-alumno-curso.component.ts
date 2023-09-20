import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoDto } from 'src/app/core/Entities/AlumnoDto';
import { CursoDto } from 'src/app/core/Entities/CursoDto';
import { Alumno } from 'src/app/core/Entities/alumno';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-alumno-curso',
  templateUrl: './add-alumno-curso.component.html',
  styleUrls: ['./add-alumno-curso.component.css']
})
export class AddAlumnoCursoComponent implements OnInit {
  loading: boolean=false
  cursos: CursoDto[] = [];
  alumno!: Alumno;
  idAlumno!: number;

  displayedColumns: string[] = ["anio",
  "Division",
  "Tecnicatura",
  "Ciclo Lectivo",
  ];
  
  selection = new SelectionModel<CursoDto>(true, []);
  dataSource = new MatTableDataSource(this.cursos);
  dataSourceFilters = new MatTableDataSource(this.cursos);
  
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  idCurso!: number;
  constructor(public dialogRef: MatDialogRef<AddAlumnoCursoComponent>,
     private _alumnoService: AlumnoService,
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any,
    private _cursoService: CursosService,
    private _router: Router,
    private _route: ActivatedRoute,
    private notificationService: NotificationService){

    this.idAlumno=data.id; 
    console.log(data.id);
    this._alumnoService.detail(data.id).subscribe({
      next:data=>{
        this.alumno=data
        console.log(data);
      }
    })
    this.cargarCurso()
  }

  

  cargarCurso(): void {
    this._cursoService.lista().subscribe(data => {
      this.dataSource.data = data;
      this.cursos=data
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
         })
    
  }
  
  /** Whether the number of selected elements matches the total number of rows. */
 

  ngOnInit(): void {
    
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

 //seleccionar un profesor de la lista
 selectedRowIndex = -1;
 selectRow(curso : CursoDto) {
  console.log(curso);
   this.selectedRowIndex = curso.id;
   this.idCurso=curso.id;
 }


  cancelar() {

    this.dialogRef.close(false);
  }
  aceptar(){
    
    const alumno: AlumnoDto = {
      dni: this.alumno.dni,
      nombres: this.alumno.nombres,
      apellido: this.alumno.apellido,
      email: this.alumno.email,
      curso: [{idCurso:this.idCurso}],
      informeDesempenios : []
    }

    this._alumnoService.agregarCurso(this.idAlumno, this.idCurso).subscribe({
     next: data=>{
       console.log("ok");
       this._router.navigate(["/user"]);
       
     },
   error: error=>{
     this._snackBar.open(error.error);
   }   })
 }
  
}