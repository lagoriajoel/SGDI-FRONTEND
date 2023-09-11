import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { CursosService } from 'src/app/core/services/cursos/cursos.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AddEditMateriasComponent } from '../add-edit-materias/add-edit-materias.component';
import { MateriasDto } from 'src/app/core/Entities/materias';
import { MateriasService } from 'src/app/core/services/materias.service';
import { CursoDto } from 'src/app/core/Entities/CursoDto';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AsignarProfesorComponent } from '../asignar-profesor/asignar-profesor.component';
export interface EmpFilter {
  name:string;
  options:string[];
  defaultValue:string;
}

export interface filterOption{
  name:string;
  value:string;
  isdefault:boolean;
}

@Component({
  selector: 'app-mostrar-materias',
  templateUrl: './mostrar-materias.component.html',
  styleUrls: ['./mostrar-materias.component.css']
})
export class MostrarMateriasComponent implements OnInit {

  materias: MateriasDto[] = [];
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
  isAdmin: boolean = false;


  nombre: string[]=['Todos','Física','Matematica','Química','FEC','Ingles','Historia','Biología','Informatica','Geografía','Dibujo Técnico', 'Ed Física'];
  anioCurso: string[]=['Todos','1','2','3','4','5','6'];
  division: string[]=['Todos','A','B','C','D','F','G','H','I'];

  cicloLectivo: string[]=['Todos','2021','2022','2023','2024','2025','2026'];
  empFilters: EmpFilter[]=[];
  
  defaultValue = "Todos";

  filterDictionary= new Map<string,string>();
  


  displayedColumns: string[] = [
    "nombre",
    "anio",
  "Division",
  "turno",
  "Ciclo Lectivo"
  ];

  dataSource = new MatTableDataSource(this.materias);
  dataSourceFilters = new MatTableDataSource(this.materias);
 

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private materiaService: MateriasService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private route: ActivatedRoute,
    private authSercive: AuthenticationService

  ) {
    this.dataSource = new MatTableDataSource();
   
  }

  ngOnInit() {

    this.titleService.setTitle("Gestion de Informes - Espacios");
    this.dataSource.sort = this.sort;
    this.cargarMaterias();

      //filtrado

    this.empFilters.push({name:'nombre',options:this.nombre,defaultValue:this.defaultValue});
    this.empFilters.push({name:'anioCurso',options:this.anioCurso,defaultValue:this.defaultValue});
    this.empFilters.push({name:'curso.division',options:this.division,defaultValue:this.defaultValue});

    this.dataSource.filterPredicate = function (record,filter) {
     
      var map = new Map(JSON.parse(filter));
      let isMatch = false;
      for(let [key,value] of map){
        isMatch = (value=="Todos") || (record[key as keyof MateriasDto] == value); 
        if(!isMatch) return false;
      }
      return isMatch;
    }
  }

  //metodos para el filtrado
  applyEmpFilter(ob:MatSelectChange,empfilter:EmpFilter) {

    this.filterDictionary.set(empfilter.name,ob.value);


    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    
    this.dataSource.filter = jsonString;
    //console.log(this.filterValues);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // metodo que lista las materias 
  cargarMaterias(): void {
    this.materiaService.lista().subscribe(data => {
      this.dataSource.data = data;
      console.log(data);
      this.materias=data
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
         })
    
  }
  irAlistarMaterias(){
    this.router.navigate(['cursos/listar'], {
      queryParams: {
        materias: true
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // agregar un curso o editarlo
  addEditCurso(id?: number) {
    const dialogRef = this.dialog.open(AddEditMateriasComponent, {
      width: "550px",
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarMaterias();
      }
    });
  }

  deleteCurso(id: number) {
    
    this.loading = true;

    setTimeout(() => {
      this.materiaService.delete(id).subscribe(() => {
        this.cargarMaterias();
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
  //ir a mostrar detalle de la materia

  mostrarDetalle(materia: MateriasDto){
    let id = materia.asignatura_id
    console.log(id);
    this.router.navigate(["/materias/detalles/", id]);

  }
 
  asignarProfesor(){
    const dialogRef = this.dialog.open(AsignarProfesorComponent, {
      width: "700px",
      disableClose: true,
    
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarMaterias();
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
