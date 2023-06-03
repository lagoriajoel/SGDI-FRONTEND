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
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';


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

  clickedRows = new Set<Alumno>();

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
    private _routes :ActivatedRoute,
    public http: HttpClient

  ) {
    
    this.dataSource = new MatTableDataSource();
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

  ver(){

    this._snackBar.open('fila seleccionada', '', {
      duration: 2000
  })}

  // csvInputChange(fileInputEvent: any) {
  //   console.log(fileInputEvent.target.files[0]);
  // }



  loaded = 0;
  selectedFiles!: FileList;
  currentFileUpload!: File;
 // Selected file is stored into selectedFiles.
 selectFile(event: any) {
  this.selectedFiles = event.target.files;
}

// Uploads the file to backend server.
upload() {
  this.currentFileUpload = this.selectedFiles.item(0)!;
  this.alumnoService.uploadSingleFile(this.currentFileUpload, this._routes.snapshot.params['id'])
    .pipe(tap(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.loaded = Math.round(100 * event.loaded / event.total!);
      }
    })).subscribe(event => {
    if (event instanceof HttpResponse) {
      this._snackBar.open('File uploaded successfully!', 'Close', {
        duration: 3000
      });
      this.listarAlumnos();
    }
  });
}




}
