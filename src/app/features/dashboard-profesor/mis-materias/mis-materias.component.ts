import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { MateriasDto } from 'src/app/core/Entities/materias';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MateriasService } from 'src/app/core/services/materias.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';

@Component({
  selector: 'app-mis-materias',
  templateUrl: './mis-materias.component.html',
  styleUrls: ['./mis-materias.component.css']
})
export class MisMateriasComponent implements OnInit {

  materias: MateriasDto[] = [];
  loading: boolean=false
  idCurso = null;
  isContenidos=false;
  isInformes=0;
  isMaterias: boolean=false;
  informes: boolean=false;
 
  
  displayedColumns: string[] = ["nombre", "año", "division", "cicloLectivo"];
  dataSource = new MatTableDataSource(this.materias);

  clickedRows = new Set<MateriasDto>();

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
   private profesorService: ProfesorService,
   private materiaService: MateriasService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _routes :ActivatedRoute,
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
      params.get("contenidos") ? (this.isContenidos = true) : (this.isContenidos = false);
     
      if (params.get("informes")) {
          this.isInformes=1
          this.informes=true
         
      }
      else {
        this.isInformes=0
          this.informes=false
      }
      params.get("materias") ? (this.isMaterias = true) : (this.isMaterias = false);

    })
    this.listarMaterias();
   
    
    
    
  }
  listarMaterias(): void {
  

      this.profesorService.listaPorDni(this.authService.getUserName()).subscribe(
        {
          next: data=> {
            console.log(data);
            
          this.materiaService.listarPorProfesor(data.id).subscribe({
            next: data=> {
              this.dataSource.data = data
            }
          })
          
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
     
     
   
    
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

  
  mensajeExito() {
    this._snackBar.open('La persona fue eliminada con exito', '', {
      duration: 2000
    });
  }

  
  mostrarFila(asignaturas: MateriasDto){
    

    if(this.isContenidos)
      {
        
       // this.router.navigate(["/contenidos/listar/", asignaturas.asignatura_id]);
       this.router.navigate(["/contenidos/contenidos/", asignaturas.asignatura_id]);
      }
    
    
   else {


    this.router.navigate(["/informes/listar/"], { 
      queryParams: {
        curso:asignaturas.curso.id,
        asignatura:asignaturas.asignatura_id,
        informe: this.isInformes,
        nombreAsignatura:asignaturas.nombre
      }});
    }

    // this.router.navigate(["/informes/actualizarInforme/"], { 
    //   queryParams: {
    //     curso:asignaturas.curso.idCurso,
    //     asignatura:asignaturas.asignatura_id,
    //     informe: this.isInformes,
    //     nombreAsignatura:asignaturas.nombre
    //   }});
    // }
   }

  



  





}
