import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasDto } from 'src/app/core/Entities/materias';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MateriasService } from 'src/app/core/services/materias.service';
import { AgregarMateriasCursoComponent } from '../agregar-materias-curso/agregar-materias-curso.component';

@Component({
  selector: 'app-listar-materias-curso',
  templateUrl: './listar-materias-curso.component.html',
  styleUrls: ['./listar-materias-curso.component.css']
})
export class ListarMateriasCursoComponent implements OnInit {

  materias: MateriasDto[] = [];
  loading: boolean = false;
  idCurso!:number;
  isContenidos = false;
  isInformes = 0;
  isMaterias: boolean = false;
  informes: boolean = false;
  isAdministrador: boolean = false;
  

  displayedColumns: string[] = ["nombre", "año", "division", "cicloLectivo"];
  dataSource = new MatTableDataSource(this.materias);

  clickedRows = new Set<MateriasDto>();

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private titleService: Title,
   
    private materiaService: MateriasService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _routes: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.dataSource = new MatTableDataSource();

  }

  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Mis Espacios");
    this.dataSource.sort = this.sort;
    this.route.queryParamMap.subscribe((params) => {
     this.idCurso= Number(params.get("curso")); 
    console.log(this.idCurso);
     this.authService.isAdmin()? this.isAdministrador=true: false;
     console.log(this.isAdministrador);
  
    });


    this.listarMaterias(this.idCurso);
  }
  listarMaterias(idCurso: number): void {
    this.materiaService.listarCurso(idCurso).subscribe({
      next: (data) => {
      
        this.dataSource.data = data;
      },
    });
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

  

  mostrarFila(asignaturas: MateriasDto) {
   
    if(this.isAdministrador) {
         console.log("administrador");
    }
    
    else {
      if (this.isContenidos) {
   
        this.router.navigate([
          "/contenidos/contenidos/",
          asignaturas.asignatura_id,
        ]);
      } else {
        this.router.navigate(["/informes/listar/"], {
          queryParams: {
            curso: asignaturas.curso.id,
            asignatura: asignaturas.asignatura_id,
            informe: 1,
            nombreAsignatura: asignaturas.nombre,
            directivo:1
          },
        });
      }
  
     
    }
  }

  agregarEspacio(){

    const dialogRef = this.dialog.open(AgregarMateriasCursoComponent, {
      width: "550px",
      disableClose: true,
      data: { idCurso: this.idCurso },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarMaterias(this.idCurso);
      }
    });

  }
}
