import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/core/Entities/alumno';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { InformesService } from 'src/app/core/services/informes.service';

@Component({
  selector: 'app-listar-informes-materias',
  templateUrl: './listar-informes-materias.component.html',
  styleUrls: ['./listar-informes-materias.component.css']
})
export class ListarInformesMateriasComponent implements OnInit {
  alumnos: Alumno[] = [];
  displayedColumns: string[] = ["dni", "nombres", "apellido", "informes"];
  dataSource = new MatTableDataSource(this.alumnos);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
   
    private alumnoService: AlumnoService,
    public dialog: MatDialog,
    private _informeService: InformesService
  
   
  ) {
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;

   this.listarAlumnosConInformes()
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

  this.alumnoService.lista().subscribe({
    next: data=> {
      console.log(data);
      this.alumnos = data
      this.dataSource.data = this.alumnos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  })
//   this.alumnoService.listarCurso(Number(this.idCurso)).subscribe((data) => {
//     data.forEach((alumno) => {
//       if (
//         alumno.informeDesempenios.some(
//           (x) =>
//             x.asignatura.asignatura_id == this.idAsignatura &&
//             x.asignatura.asignatura_id != null
//         )
//       )
//         this.alumnos.push(alumno);
//     });

//     this.dataSource.data = this.alumnos;
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   });
}

listarInformes(){
  this._informeService.lista().subscribe({
    next: data=>{
      console.log(data);
    }
  }); //
}


actualizarInforme(id: number): void {

}
SelectedRow(alumno: Alumno) {

}
}
