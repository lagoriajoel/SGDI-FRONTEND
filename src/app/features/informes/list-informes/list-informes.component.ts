import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Alumno } from 'src/app/core/Entities/alumno';
import { Informes } from 'src/app/core/Entities/informe';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AddEditInformesComponent } from '../add-edit-informes/add-edit-informes.component';
import { MostrarInformeComponent } from '../mostrar-informe/mostrar-informe.component';
import { contenido } from 'src/app/core/Entities/Contenido';

@Component({
  selector: 'app-list-informes',
  templateUrl: './list-informes.component.html',
  styleUrls: ['./list-informes.component.css']
})
export class ListInformesComponent implements OnInit {
  informes: Informes[] = [];
  alumnos: Alumno[]=[]
  alumnosConInformes:Alumno[]=[]
  loading: boolean=true
  idCurso :string="";
  idAsignatura!:number;
  fecha: string="";
  isInforme!:number;
  InformeAlumno: Informes[]=[];
  NombreAsignatura: string=''


  displayedColumns: string[] = ["dni", "nombres", "apellido", "informes"];
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
   
    // this.idCurso = this._routes.snapshot.params["id"];
    // this.idAsignatura=this._routes.snapshot.params["idAsignatura"]

    this._routes.queryParamMap
    .subscribe((params) => {
     
       
  
       this.idCurso=params.get("curso")!;
       this.idAsignatura=Number(params.get("asignatura"))!;
      
      
       this.isInforme=Number(params.get("informe"))!;

       this.NombreAsignatura=params.get("nombreAsignatura")!;

    
     console.log(this.isInforme);
  
     
    }
  );
      
   
  }

  


  ngOnInit() {
    this.titleService.setTitle("Gestion de Informes - Cursos");
    this.logger.log("Cursos loaded");
    this.notificationService.openSnackBar("Cursos loaded");
    this.dataSource.sort = this.sort;

     
   this.isInforme===0?this.listarAlumnos():this.listarAlumnosConInformes()
    
  }
    //lista todos los alumnos del curso 
        listarAlumnos(): void {
        

          this.alumnoService
          .listarCurso(Number(this.idCurso))
          .subscribe((data) => {
            
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          
     
   
  }

   // lista los alumnos que tiene informes de desempeño de la asignatura
   listarAlumnosConInformes(): void {
        

            this.alumnoService
            .listarCurso(Number(this.idCurso))
            .subscribe((data) => {
          
            data.forEach(alumno => {
              if(alumno.informeDesempenios.some(x=>(x.id_asignatura==this.idAsignatura&&x.id_asignatura!=null)))
                  this.alumnosConInformes.push(alumno);
                  
            })
            console.log(this.alumnosConInformes);
            this.dataSource.data = this.alumnosConInformes;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
        

}

  // abre un modal para agregar los contenidos adeidados por el alumno
  generarInforme(idAlumno:number){

   
    const dialogRef = this.dialog.open(AddEditInformesComponent, {
      width: "700px",
      disableClose: true,
      data: { idAlumno: idAlumno, 
              idCurso: Number(this.idCurso),
              idAsignatura: Number(this.idAsignatura)
             
             },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarAlumnos();
      }
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

  //mostrar los informes de desempeño de los alumnos

  SelectedRow(alumno: Alumno) {


    if(this.isInforme!=0){
       
     this.InformeAlumno= this.getInformeAlumno(alumno,this.idAsignatura)
     console.log(this.InformeAlumno);
      
    const dialogRef = this.dialog.open(MostrarInformeComponent, {
      width: "700px",
      disableClose: true, data: {
        infome: this.InformeAlumno,
        NombreAlumno: alumno.nombres +' '+ alumno.apellido,
        dni: alumno.dni,
        NombreAsignatura: this.NombreAsignatura

      }
      
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarAlumnosConInformes();
      }
    });
  }
  }



  //metodo que obtiene el informe de un alumno por asignatura
  
  getInformeAlumno(alumno: Alumno, idAsignatura: number): Informes[]{

       const informe= alumno.informeDesempenios.filter(inf => inf.id_asignatura === idAsignatura)
    
      return informe;
  }
}
