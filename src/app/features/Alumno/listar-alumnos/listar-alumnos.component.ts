import { ActivatedRoute } from '@angular/router';
import { AddEditAlumnosComponent } from './../add-edit-alumnos/add-edit-alumnos.component';
import { AlumnoService } from './../../../core/services/alumno.service';
import { Alumno } from './../../../core/Entities/alumno';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrls: ['./listar-alumnos.component.css']
})
export class ListarAlumnosComponent implements OnInit {
  alumnos: Alumno[] = [];
  loading: boolean=false
  idCurso = null;
  


  displayedColumns: string[] = ["dni", "nombres", "apellido", "email","cursoId", "acciones"];
  dataSource = new MatTableDataSource(this.alumnos);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private alumnoService: AlumnoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _routes :ActivatedRoute

  ) {
    
    this.dataSource = new MatTableDataSource();
    console.log( this._routes.snapshot.paramMap.get('id'));
   this.idCurso =this._routes.snapshot.params['id']
  }

  


  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Alumno");
    this.logger.log("Cursos loaded");
    this.notificationService.openSnackBar("Alumnos Cargados");
    this.dataSource.sort = this.sort;
    this.listarAlumnos();
    
    
    
  }
  listarAlumnos(): void {
  

    this.alumnoService.listarCurso(this._routes.snapshot.params['id']).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
     
    })
    
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addEditAlumno(id?: number, idCurso?: number) {

    const dialogRef = this.dialog.open(AddEditAlumnosComponent, {
      width: "500px",
      disableClose: true,
      data: { id: id, idCurso: this.idCurso},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarAlumnos();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteAlumno(id: number) {

    let idAlumnno=id

    console.log(idAlumnno);
    this.loading = true;

    setTimeout(() => {
      this.alumnoService.delete(id).subscribe(() => {
        this.listarAlumnos();
        this.mensajeExito();
      },
      error => {
        this.notificationService.openSnackBar(error.error);
      })
    },
     1000);
  }
  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con exito', '', {
      duration: 2000
    });
  }

}
