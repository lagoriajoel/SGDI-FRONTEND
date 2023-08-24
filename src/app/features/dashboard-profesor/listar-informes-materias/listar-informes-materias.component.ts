import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AlumnoInformeDto } from "src/app/core/Entities/AlumnoInformeDto";
import { AlumnoService } from "src/app/core/services/alumno.service";
import { InformesService } from "src/app/core/services/informes.service";
import { FormEditInformeComponent } from "../form-edit-informe/form-edit-informe.component";
import { InformesAlumnoDto } from "src/app/core/Entities/InformeAlumnoDto";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-listar-informes-materias",
  templateUrl: "./listar-informes-materias.component.html",
  styleUrls: ["./listar-informes-materias.component.css"],
})
export class ListarInformesMateriasComponent implements OnInit {
  alumnos: AlumnoInformeDto[] = [];
  displayedColumns: string[] = ["dni", "nombres", "apellido", "informes"];
  dataSource = new MatTableDataSource(this.alumnos);
  nombreMateria: string = "";
  anioMateria: string = "";
  idAsignatura!:number
  InformeAlumno!: InformesAlumnoDto;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private alumnoService: AlumnoService,
    public dialog: MatDialog,
    private title: Title,
    private _informeService: InformesService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource();

    this.route.queryParamMap.subscribe((params) => {
      this.nombreMateria = params.get("nombreMateria")!;
      this.anioMateria = params.get("anioMateria")!;
      this.idAsignatura =Number(params.get("idAsignatura"))!
      
    });
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
this.title.setTitle("SIGEID - INFORMES")
    this.listarAlumnosConInformes();
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

  // lista los alumnos que tiene informes de desempeño de la asignatura
  listarAlumnosConInformes(): void {
    this.alumnoService.listarAnioCurso(this.anioMateria).subscribe({
      next: (data) => {
        console.log(data);
        data.forEach((alumno) => {
          if (
            alumno.informeDesempenios.some(
              (x) => x.asignatura.nombre == this.nombreMateria
            )
          )
            this.alumnos.push(alumno);
        });

        this.dataSource.data = this.alumnos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {},
    });
  }

  actualizarInforme(id: number): void {
    const alumno=this.alumnos.find(alumno=>alumno.id == id)!
      
      
    this.InformeAlumno = this.getInformeAlumno(alumno, this.nombreMateria);
  

   const dialogRef = this.dialog.open(FormEditInformeComponent, {
     width: "1000px",
     disableClose: true,
     data: {
       alumno: alumno,
       informe: this.InformeAlumno,
       NombreAlumno: alumno.nombres + " " + alumno.apellido,
       dni: alumno.dni,
       NombreAsignatura: this.nombreMateria,
       idAsignatura: Number(this.idAsignatura),
      
     },
   });

   dialogRef.afterClosed().subscribe((result) => {
     if (result) {
       this.listarAlumnosConInformes();
     }
   });
 }

  // metodo que obtiene el informe de un alumno por asignatura

  getInformeAlumno(alumno: AlumnoInformeDto, NombreMateria: string): InformesAlumnoDto {
   console.log(alumno);
    const informe = alumno.informeDesempenios.filter(
      (inf) => inf.asignatura.nombre == NombreMateria
    );
console.log(informe);
    return informe[0];
  }

  
  
 

  verInforme(idAlumno: number){
    
    const alumno=this.alumnos.find(alumno=>alumno.id == idAlumno)!
      
      
    this.InformeAlumno = this.getInformeAlumno(alumno, this.nombreMateria);

    let informeId = this.InformeAlumno.id;

    this.alumnoService
      .generarPDF(informeId, alumno.dni )
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
}
