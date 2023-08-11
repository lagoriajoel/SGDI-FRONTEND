import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/core/Entities/alumno';
import { Informes } from 'src/app/core/Entities/informe';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


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
  mesaExamen:boolean=false
  isAdmin:boolean = false
  form!: FormGroup;

  displayedColumns: string[] = ["Asignatura", "Curso", "acciones"];
  dataSource = new MatTableDataSource(this.informesDesempenio);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
  
  
    private notificationService: NotificationService,
    private alumnoService: AlumnoService,
    public dialog: MatDialog,
    private _routes: ActivatedRoute,
    private _router: Router,
    
  ) {
    this.dataSource = new MatTableDataSource();
    this._routes.queryParamMap
    .subscribe((params) => {
      params.get("mesa") ? (this.mesaExamen= true) : (this.mesaExamen = false);
    })

   
  }
  private createForm() {
    //const savedUserEmail = localStorage.getItem('savedUserEmail');

    this.form = new FormGroup({
      dni: new FormControl('', [Validators.required]),
     
      
      
      });
}
 
  ngOnInit() {
       
   
    this.dataSource.sort = this.sort;
    this.createForm();
    
  }


  listarInformesAlumnos(dni:string): void {
    this.alumnos = [];
    this.dni_ingresado=dni;
   
     
        this.alumnoService.listaPorDni(dni).subscribe({
         next: (data) => {
            
          console.log(data);
            this.alumnos.push(data);
            this.alumno = data;
            
            this.dataSource.data = data.informeDesempenios;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          
            this.nombreAlumno = this.alumno.nombres;
            this.apellidoAlumno = this.alumno.apellido;
          },
         error: (error) => {
            this.notificationService.openSnackBar(error.error.Mensaje);
          }
  });

      
  }

  buscarAlumno(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
     filterValue.trim().toLowerCase();
     this.dni_ingresado=filterValue
   
    console.log(filterValue);
  }
buscar(){
  this.listarInformesAlumnos(this.form.get('dni')?.value)
  
}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // enviamos el id del informe al back

  generarPDF(id: number) {
    let informeId = id;

    this.alumnoService
      .generarPDF(informeId,this.dni_ingresado )
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

  //metodo que lleva al componente actualiza informe

  actualizarInforme(idInforme: number){

    this._router.navigate(["/mesa/mostrar"])

  }

  
}
