import { contenido } from "./../../../core/Entities/Contenido";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AddEditContenidosComponent } from "../add-edit-contenidos/add-edit-contenidos.component";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { NGXLogger } from "ngx-logger";
import { NotificationService } from "src/app/core/services/notification.service";
import { Title } from "@angular/platform-browser";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { ContenidosService } from "src/app/core/services/contenidos.service";
import { MateriasService } from "src/app/core/services/materias.service";
import { MateriasDto } from "src/app/core/Entities/materias";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";


@Component({
  selector: "app-listar-contenidos",
  templateUrl: "./listar-contenidos.component.html",
  styleUrls: ["./listar-contenidos.component.css"],
})
export class ListarContenidosComponent implements OnInit {
  contenidos: contenido[] = [];
  loading: boolean = true;
  idAsignatura = null;
  asignatura!: MateriasDto;
  NombreAsignatura=''
  cursoNombre=''
  displayedColumns: string[] = ["nombre", "descripcion", "acciones"];
  dataSource = new MatTableDataSource(this.contenidos);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _routes: ActivatedRoute,
    private contenidoService: ContenidosService,
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
    this.titleService.setTitle("Gestion de Informes - Cursos");


    this.dataSource.sort = this.sort;
    this.getNombreAsignatura();
    this.listarContenidos();
  }

  listarContenidos(): void {
    this.contenidoService
      .listarContenidoPorAsignatura(
        (this.idAsignatura = this._routes.snapshot.params["id"])
      )
      .subscribe((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.contenidos = data;
       
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addEditContenido(id?: number, idAsignatura?: number) {
    const dialogRef = this.dialog.open(AddEditContenidosComponent, {
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
      this.contenidoService.delete(id).subscribe(() => {
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
