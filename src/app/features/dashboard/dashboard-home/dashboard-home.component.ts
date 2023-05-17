import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Alumno } from 'src/app/core/Entities/alumno';
import { Informes } from 'src/app/core/Entities/informe';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  alumnos: Alumno[] = [];
  alumno!: Alumno;
  informesDesempenio: Informes[] = [];
  loading: boolean = true;
  idCurso = null;
  dni_ingresado: string = "";
  AsignaturaInforme: string = "";
  CursoInforme: string = "";
  nombreAlumno!: string;
  apellidoAlumno!: string;
  cicloLectivo: string = "";
  

  displayedColumns: string[] = ["Asignatura", "Curso", "acciones"];
  dataSource = new MatTableDataSource(this.informesDesempenio);

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
    private _routes: ActivatedRoute,
    private _router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Cursos");
    
   
    this.dataSource.sort = this.sort;
  }
  listarAlumnos(): void {
    this.alumnos = [];

    this.alumnoService.listaPorDni(this.dni_ingresado).subscribe(
      (data) => {
        this.alumnos.push(data);
        this.alumno = data;
        console.log(this.alumno);
        this.dataSource.data = data.informeDesempenios;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data);
        this.nombreAlumno = this.alumno.nombres;
        this.apellidoAlumno = this.alumno.apellido;
      },
      (error) => {
        this.notificationService.openSnackBar(error.error.Mensaje);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // enviamos el id del informe al back

  generarPDF(id: number) {
    let informeId = id;

    this.alumnoService
      .generarPDF(informeId, this.dni_ingresado)
      .subscribe((data) => {
        let donwloadURL = window.URL.createObjectURL(data);
        // let link= document.createElement('a')
        // link.href=donwloadURL
        // link.download="informe.pdf"
        // link.click()

        window.open(donwloadURL, "_blank");
      });
  }
}
