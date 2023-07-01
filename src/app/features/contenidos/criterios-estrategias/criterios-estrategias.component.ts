import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCriteriosComponent } from '../add-edit-criterios/add-edit-criterios.component';
import { criterio } from 'src/app/core/Entities/criterio';
import { MateriasDto } from 'src/app/core/Entities/materias';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MateriasService } from 'src/app/core/services/materias.service';
import { criterioService } from 'src/app/core/services/criterio.service';
import { criterioDto } from 'src/app/core/Entities/criterioDTO';

@Component({
  selector: 'app-criterios-estrategias',
  templateUrl: './criterios-estrategias.component.html',
  styleUrls: ['./criterios-estrategias.component.css']
})
export class CriteriosEstrategiasComponent implements OnInit {
  criterio: criterioDto[] = [];
  loading: boolean = true;
  idAsignatura = null;
  asignatura!: MateriasDto;
  NombreAsignatura=''
  cursoNombre=''
  displayedColumns: string[] = ["criterio", "acciones"];
  dataSource = new MatTableDataSource(this.criterio);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
  
   
  
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _routes: ActivatedRoute,
    private criterioService: criterioService,
    private _materiaService: MateriasService
  ) {
    this.dataSource = new MatTableDataSource();
   
    this.idAsignatura = this._routes.snapshot.params["id"];
  }

  getNombreAsignatura() {
    this._materiaService
      .detail((this.idAsignatura = this._routes.snapshot.params["id"]))
      .subscribe((data) => {
        this.asignatura = data;
        this.NombreAsignatura = this.asignatura.nombre
        this.cursoNombre = this.asignatura.curso.anio + this.asignatura.curso.division
       
      });
  }

  ngOnInit() {

    this.dataSource.sort = this.sort;
    this.getNombreAsignatura();
    this.listarCriterios();
  }

  listarCriterios(): void {
    this.criterioService
      .listarContenidoPorAsignatura(
        (this.idAsignatura = this._routes.snapshot.params["id"])
      )
      .subscribe((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.criterio = data;
        console.log(data);
       
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addEditContenido(id?: number, idAsignatura?: number) {
    const dialogRef = this.dialog.open(AddEditCriteriosComponent, {
      width: "500px",
      disableClose: true,
     data: { id: id, idAsignatura: this.idAsignatura = this._routes.snapshot.params["id"] },
     
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarCriterios();
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

  eliminar(id: number){
       this.criterioService.delete(id).subscribe({
        next: data=> {
          console.log("eliminado");
        },
        error : error=> {
         console.log(error);
        }
       })
  }
}
