import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params } from "@angular/router";
import { Alumno } from "src/app/core/Entities/alumno";
import { Informes } from "src/app/core/Entities/informe";
import { AlumnoService } from "src/app/core/services/alumno.service";
import { AddEditInformesComponent } from "../add-edit-informes/add-edit-informes.component";
import { MostrarInformeComponent } from "../mostrar-informe/mostrar-informe.component";


@Component({
  selector: "app-list-informes",
  templateUrl: "./list-informes.component.html",
  styleUrls: ["./list-informes.component.css"],
})
export class ListInformesComponent implements OnInit {
  informes: Informes[] = [];
 // informeAlumnos!: Informes;
  alumnos: Alumno[] = [];
  alumnosConInformes: Alumno[] = [];
  loading: boolean = true;
  idCurso: string = "";
  idAsignatura!: number;
  fecha: string = "";
  isInforme!: number;
  InformeAlumno!: Informes;
  NombreAsignatura: string = "";

  displayedColumns: string[] = ["dni", "nombres", "apellido", "informes"];
  dataSource = new MatTableDataSource(this.alumnos);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private titleService: Title,
    private alumnoService: AlumnoService,
    public dialog: MatDialog,
  
    private _routes: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource();

    this._routes.queryParamMap.subscribe((params) => {
      this.idCurso = params.get("curso")!;
      this.idAsignatura = Number(params.get("asignatura"))!;
      this.isInforme = Number(params.get("informe"))!;
      this.NombreAsignatura = params.get("nombreAsignatura")!;

    });
  }

  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Cursos");
    this.dataSource.sort = this.sort;

    this.isInforme === 0
      ? this.listarAlumnos()
      : this.listarAlumnosConInformes();
  }
  //lista todos los alumnos del curso
  listarAlumnos(): void {
    this.alumnoService.listarCurso(Number(this.idCurso)).subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // lista los alumnos que tiene informes de desempeño de la asignatura
  listarAlumnosConInformes(): void {
    this.alumnoService.listarCurso(Number(this.idCurso)).subscribe((data) => {
      data.forEach((alumno) => {
        console.log(alumno);
        if (
          alumno.informeDesempenios.some(
            (x) =>
              x.asignatura.asignatura_id == this.idAsignatura &&
              x.asignatura.asignatura_id != null
          )
        )
          this.alumnosConInformes.push(alumno);
      });

      this.dataSource.data = this.alumnosConInformes;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // abre un modal para agregar los contenidos adeidados por el alumno
  generarInforme(idAlumno: number) {
    const dialogRef = this.dialog.open(AddEditInformesComponent, {
      width: "1000px",
      disableClose: true,
      data: {
        idAlumno: idAlumno,
        idCurso: Number(this.idCurso),
        idAsignatura: Number(this.idAsignatura),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarAlumnos();
      }
    });
  }
  // aactualizar el informe de desepeño
  actualizarInforme(idAlumno: number){
    if (this.isInforme != 0) {
      const alumno=this.alumnosConInformes.find(alumno=>alumno.id == idAlumno)!
      
      
       this.InformeAlumno = this.getInformeAlumno(alumno, this.idAsignatura);
     
 
      const dialogRef = this.dialog.open(MostrarInformeComponent, {
        width: "1000px",
        disableClose: true,
        data: {
          alumno: alumno,
          informe: this.InformeAlumno,
          NombreAlumno: alumno.nombres + " " + alumno.apellido,
          dni: alumno.dni,
          NombreAsignatura: this.NombreAsignatura,
          idAsignatura: Number(this.idAsignatura),
         
        },
      });
 
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.listarAlumnosConInformes();
        }
      });
    }
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

  
  //mostrar el informe de desempeño
  verInforme(idAlumno: number){
    
    const alumno=this.alumnosConInformes.find(alumno=>alumno.id == idAlumno)!
      
      
    this.InformeAlumno = this.getInformeAlumno(alumno, this.idAsignatura);

    let informeId = this.InformeAlumno.id;

    this.alumnoService
      .generarPDF(informeId,alumno.dni )
      .subscribe((data) => {
        let donwloadURL = window.URL.createObjectURL(data);
        // let link= document.createElement('a')
        // link.href=donwloadURL
        // link.download="informe.pdf"
        // link.click()
        console.log(data);

        window.open(donwloadURL, "_blank");
      });
  }

 // metodo que obtiene el informe de un alumno por asignatura

  getInformeAlumno(alumno: Alumno, idAsignatura: number): Informes {
    const informe = alumno.informeDesempenios.filter(
      (inf) => inf.asignatura.asignatura_id === idAsignatura
    );

    return informe[0];
  }
}
