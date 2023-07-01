import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEditEstrategiasComponent } from '../add-edit-estrategias/add-edit-estrategias.component';
import { estrategiaDto } from 'src/app/core/Entities/estrategiaDto';
import { MateriasDto } from 'src/app/core/Entities/materias';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { estrategiaService } from 'src/app/core/services/estrategia.service';
import { MateriasService } from 'src/app/core/services/materias.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styleUrls: ['./estrategias.component.css']
})
export class EstrategiasComponent implements OnInit {
  estrategia: estrategiaDto[] = [];
  loading: boolean = true;
  idAsignatura = null;
  asignatura!: MateriasDto;
  NombreAsignatura=''
  cursoNombre=''
  displayedColumns: string[] = ["estrategia", "acciones"];
  dataSource = new MatTableDataSource(this.estrategia);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
  
   
  
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _routes: ActivatedRoute,
    private estrategiaService: estrategiaService,
    private _materiaService: MateriasService,
    private notificationService: NotificationService,
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
    this.listarContenidos();
  }

  listarContenidos(): void {
    this.estrategiaService
      .listarContenidoPorAsignatura(
        (this.idAsignatura = this._routes.snapshot.params["id"])
      )
      .subscribe((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.estrategia = data;
        console.log(data);
       
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addEditContenido(id?: number, idAsignatura?: number) {
    const dialogRef = this.dialog.open(AddEditEstrategiasComponent, {
      width: "500px",
      disableClose: true,
     data: { id: id, idAsignatura: this.idAsignatura = this._routes.snapshot.params["id"] },
     
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarContenidos();
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

  eliminar(id: number) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "500px",
      disableClose: true,
   data: {
    title:"Eliminar Estrategia",
    message:"¿Esta seguro de eliminar la estrategia?"
   }
   

    }).afterClosed().subscribe((res) => {

     if(res){
      this.estrategiaService.delete(id).subscribe(() => {
        this.listarContenidos();
        
      },
      error => {
        this.notificationService.openSnackBar(error.error);
      })
     }

    });
    this.loading = true;
  }
}
