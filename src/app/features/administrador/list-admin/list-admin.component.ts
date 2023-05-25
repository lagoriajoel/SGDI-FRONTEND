import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Administrador } from 'src/app/core/Entities/administrador';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { AddEditAdminComponent } from '../add-edit-admin/add-edit-admin.component';
import { AdministradorService } from 'src/app/core/services/administrador.service';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {
  loading: boolean=false
  administadores:Administrador[]=[];
 
   displayedColumns: string[] = ["dni","nombre","apellido","email","acciones"];
   dataSource = new MatTableDataSource(this.administadores);
  
   @ViewChild(MatSort, { static: true })
   sort: MatSort = new MatSort();
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   constructor(
     private logger: NGXLogger,
     private notificationService: NotificationService,
     private titleService: Title,
     private _adminService: AdministradorService,
     public dialog: MatDialog,
     private _snackBar: MatSnackBar,
     private router: Router,
     private _liveAnnouncer: LiveAnnouncer,
     private route: ActivatedRoute
 
   ) {
     this.dataSource = new MatTableDataSource();
   }
 
   ngOnInit() {
     this.titleService.setTitle("Gestion de Informes - Profesores");
     this.logger.log("Profesores cargados");
     this.notificationService.openSnackBar("profesores cargados");
     this.dataSource.sort = this.sort;
     this.cargarProfesores();
    
 
    
     
   }
   cargarProfesores(): void {
     
     this._adminService.lista().subscribe(data => {
       this.dataSource.data = data;
       console.log("admin");
       console.log(data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      
     })

}


ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

addEditProfesor(id?: number) {
  const dialogRef = this.dialog.open(AddEditAdminComponent, {
    width: "550px",
    disableClose: true,
    data: { id: id },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.cargarProfesores();
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

deleteProfesor(id: number) {
  
  

  setTimeout(() => {
    this._adminService.delete(id).subscribe(() => {
      this.cargarProfesores();
      this.mensajeExito();
    })
  }, 1000);
}
mensajeExito() {
  this._snackBar.open('La persona fue eliminada con exito', '', {
    duration: 2000
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
