import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { cursoAlumno } from "src/app/core/Entities/cursoAlumno";
import { Informes } from "src/app/core/Entities/informe";
import { AddEditAlumnosComponent } from "../../Alumno/add-edit-alumnos/add-edit-alumnos.component";
import { AlumnoService } from "src/app/core/services/alumno.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CursosService } from "src/app/core/services/cursos/cursos.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { Alumno } from "src/app/core/Entities/alumno";
import { contenido } from "src/app/core/Entities/Contenido";
import { AlumnoInforme } from "src/app/core/Entities/alumnoInforme";
import { MatTableDataSource } from "@angular/material/table";
import { ContenidosService } from "src/app/core/services/contenidos.service";
import { InformesService } from "src/app/core/services/informes.service";
import { CursoInforme } from "src/app/core/Entities/cursoInforme";
import { MateriaContenido } from "src/app/core/Entities/materiaContenido";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { criterioService } from "src/app/core/services/criterio.service";
import { estrategiaService } from "src/app/core/services/estrategia.service";
import { criterioDto } from "src/app/core/Entities/criterioDTO";
import { estrategiaDto } from "src/app/core/Entities/estrategiaDto";

@Component({
  selector: "app-add-edit-informes",
  templateUrl: "./add-edit-informes.component.html",
  styleUrls: ["./add-edit-informes.component.css"],
})
export class AddEditInformesComponent implements OnInit {
 

  //Array de contenidos adeudados por el Alumno
  contenidos: contenido[] = [];

  loading: boolean = false;
  operacion: string = "Agregar ";
  idAlumno: number;
  idCurso: number;
  idAsignatura: number;
  informeDesempeño!: Informes;
  dni:String="";
  nombres:String="";
  apellidos:String="";
  email:String="";
  profesor:String="";
  cicloLectivo:String="";
  criterios: criterioDto[] = [];
  estrategias: estrategiaDto[] = [];
  cursoAnio: String="";
  cursoDivision: String="";
  rowHeight:number=0

  cursoInforme!: cursoAlumno;

  alumnoInforme!: AlumnoInforme;
  cursoAlumno!: cursoAlumno;
  idInforme: number = 0;

  displayedColumns: string[] = ["nombre", "descripcion", "acciones"];
  dataSource = new MatTableDataSource(this.contenidos);

    constructor(
      public dialogRef: MatDialogRef<AddEditInformesComponent>,
      private fb: FormBuilder,
      private _alumnoService: AlumnoService,
      private _snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _criteriosService :criterioService,
      private _estrategiaService :estrategiaService,
      private _cursoService: CursosService,
      private _contenidosService: ContenidosService,
      private _informesService: InformesService,
      private notificationService: NotificationService,
      private authService: AuthenticationService
    ) {

    this.idAlumno = data.idAlumno;
    this.idCurso = data.idCurso;
    this.idAsignatura = data.idAsignatura;
    this.profesor=this.authService.getName()
    this.listarContenidos(this.idAsignatura);
    this.listarCriteriosEstrategias(this.idAsignatura)
    this.getCurso(this.idCurso)
   
    
  }
   getCurso(id:number){
       this._cursoService.detail(id).subscribe(data=>{
           this.cicloLectivo = data.cicloLectivo;
           this.cursoAnio=data.anio
           this.cursoDivision=data.division;

       }) 
   }

    ngOnInit(): void {
      this.esEditar(this.idAlumno);

    }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = "Editar ";
      this.getAlumno(id);
    }
  }

  getAlumno(id: number) {
    this._alumnoService.detail(id).subscribe((data) => {
      
       this.dni= data.dni.toString()
        this.nombres=data.nombres
        this.apellidos= data.apellido
        this.email=data.email
      
   
    });
  }
  //metodo que lista todos los contenidos de la Asignatura
  listarContenidos(idAsignatura: number) {
    let id = idAsignatura;
    this._contenidosService
      .listarContenidoPorAsignatura(id)
      .subscribe((data) => {
        
      
        this.dataSource.data = data;
      
        this.contenidos = data;
       
      });
  }
  //metodo que carga los criterios y estrategias de la asignatura
  listarCriteriosEstrategias(idAsignatura: number) {
    
    this._criteriosService.listarContenidoPorAsignatura(idAsignatura).subscribe({
      next: data=>{ this.criterios=data; 
        this.rowHeight= data.length*35     
        console.log(this.criterios.length);},
      error: error=>{}
    });

    this._estrategiaService.listarContenidoPorAsignatura(idAsignatura).subscribe({
      next: data=>{this.estrategias=data; 
          if(data.length>this.criterios.length)   this.rowHeight= data.length*35 
      },
      error: error=>{}
    });
    
  }

  cancelar() {
    this.dialogRef.close(false);
  }
  //metodo que genera un informe de desempeño y lo actualiza con los contenidos
  generarInforme() {


    
    const alumnoInf: AlumnoInforme = {
      id: this.idAlumno,
    };
   const materiaInf: MateriaContenido= {
         asignatura_id: this.idAsignatura
   }
   
    

    const informeNuevo: Informes = {
      id:0,
      criteriosEvaluacion: this.criterios,
      estrategiasEvaluacion: this.estrategias,
      profesorNombre:this.authService.getName(),
      asignatura: materiaInf,
      alumno: alumnoInf,
      contenidosAdeudados: this.contenidos,
    };

  

    this._informesService.save(informeNuevo).subscribe({
      
     next: (data) => {
     
       console.log(data);
    },
    error: (error) => {
          this.dialogRef.close(true);
          this.notificationService.openSnackBar(error.error.Mensaje);
        },
  
  
  });
    this.mensajeExito("actualizada");
    this.dialogRef.close(true);
  }

  //eliminar contenido de la tabla
  deleteContenido(idContenido: number) {
    let idCont = idContenido;

    console.log(this.contenidos);

    const index = this.contenidos.findIndex((x) => x.id === idCont);

    this.contenidos.splice(index, 1);
    console.log(this.contenidos);

    this.dataSource = new MatTableDataSource(this.contenidos);
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El informe fue ${operacion} con exito`, "", {
      duration: 2000,
    });
  }
}
