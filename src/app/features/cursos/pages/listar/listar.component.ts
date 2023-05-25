import { ActivatedRoute, Router } from '@angular/router';
import { AddEditCursoComponent } from "./../add-edit-curso/add-edit-curso.component";
import { Subscription } from "rxjs";

import { CursosService } from "./../../../../core/services/cursos/cursos.service";


import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NGXLogger } from "ngx-logger";
import { Title } from "@angular/platform-browser";
import { NotificationService } from "src/app/core/services/notification.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CursoDto } from "src/app/core/Entities/CursoDto";
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.css"],
})
export class ListarComponent implements OnInit {
  cursos: CursoDto[] = [];
  loading: boolean = true;
  idCurso: number = 0;
  añoCurso!: string;
  isContenidos: number = 0;
  isAlumno: boolean = false;
  isInforme: boolean = false;
  isCurso: boolean = false;
  color:string=""
  informesPorAsignatura:number = 0;


  displayedColumns: string[] = ["anio",
  "Division",
  "turno",
  "Ciclo Lectivo",
  "acciones",
  "contenidos"];
  dataSource = new MatTableDataSource(this.cursos);
  FilaCurso!: CursoDto;

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private cursoService: CursosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private route: ActivatedRoute

  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Cursos");
    this.logger.log("Cursos loaded");
    this.notificationService.openSnackBar("Cursos loaded");
    this.dataSource.sort = this.sort;
    this.cargarCurso();

    this.route.queryParamMap.subscribe((params) => {
      params.get("alumnos") ? (this.isAlumno = true) : (this.isAlumno = false);
      params.get("informes") ? (this.isInforme = true) : (this.isInforme = false);
      params.get("curso") ? (this.isCurso = true) : (this.isCurso = false);

    });
    
  }
  cargarCurso(): void {
    this.cursoService.lista().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
    })
    
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addEditCurso(id?: number) {
    const dialogRef = this.dialog.open(AddEditCursoComponent, {
      width: "550px",
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarCurso();
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

  deleteCurso(id: number) {
    
    this.loading = true;

    setTimeout(() => {
      this.cursoService.delete(id).subscribe(() => {
        this.cargarCurso();
        this.mensajeExito();
      })
    }, 1000);
  }
  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con exito', '', {
      duration: 2000
    });
  }

  addAlumno(id: number){
   this.idCurso=id

    this.router.navigate(["/alumnos/listar/", this.idCurso]);

  }
 //generar informes de desempeño del curso. se envia por url id curso y año para el filtrado
 
     informes(idCurso: number, añoCurso: string) {
              this.isContenidos = 1;
              this.idCurso = idCurso;
              this.añoCurso = añoCurso;
              // this.router.navigate(["/materias/listar/",
              //   this.idCurso,
              //   this.añoCurso,
              //   this.isContenidos,
              // ]);

              this.router.navigate(["/materias/listar/"], { 
                queryParams: {
                  curso:this.idCurso, 
                  anioCurso:this.añoCurso,
                  isContenido: this.isContenidos,
                  isInforme: this.informesPorAsignatura
                }
              });
            }

      agregarContenido(idCurso: number, añoCurso: string) {
              this.isContenidos = 0;
              this.idCurso = idCurso;
              this.añoCurso = añoCurso;
        //       this.router.navigate([
        //         "/materias/listar/",
        //         this.idCurso,
        //         this.añoCurso,
        //         this.isContenidos,
        // ]);

        this.router.navigate(["/materias/listar/"], { 
          queryParams: {
            curso:this.idCurso, 
            anioCurso:this.añoCurso,
            isContenido: this.isContenidos,
           
          }
        });
      }


mostrarFila( curso1: CursoDto){
  

  this.isContenidos = 1;
  this.idCurso = curso1.idCurso;
  this.añoCurso = curso1.anio;
  this.informesPorAsignatura=1

  this.router.navigate(["/materias/listar/"], { 
    queryParams: {
      curso:this.idCurso, 
      anioCurso:this.añoCurso,
      isContenido: this.isContenidos,
      isInforme: this.informesPorAsignatura
     
    }
  });
  
}



announceSortChange(sortState: Sort) {
  // This example uses English messages. If your application supports
  // multiple language, you would internationalize these strings.
  // Furthermore, you can customize the message to add additional
  // details about the values being sorted.
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce("Sorting cleared");
  }
}





}
