import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Directivo } from 'src/app/core/Entities/Directivo';
import { DirectivoService } from 'src/app/core/services/Directivo.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AddEditAdminComponent } from '../../administrador/add-edit-admin/add-edit-admin.component';
import { AddEditDirectivoComponent } from '../add-edit-directivo/add-edit-directivo.component';

@Component({
  selector: 'app-directivo-user',
  templateUrl: './directivo-user.component.html',
  styleUrls: ['./directivo-user.component.css']
})
export class DirectivoUserComponent implements OnInit {
  loading: boolean=false
  directivos:Directivo[]=[];
 
   displayedColumns: string[] = ["dni","nombre","apellido","email","acciones"];
   dataSource = new MatTableDataSource(this.directivos);
  
   @ViewChild(MatSort, { static: true })
   sort: MatSort = new MatSort();
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   constructor(
    
     private notificationService: NotificationService,
     private titleService: Title,
     private _directService: DirectivoService,
     public dialog: MatDialog,
     private _snackBar: MatSnackBar,
   
     private _liveAnnouncer: LiveAnnouncer,
    
 
   ) {
     this.dataSource = new MatTableDataSource();
   }
 
   ngOnInit() {
     this.titleService.setTitle("Gestion de Informes - Profesores");
    
     this.notificationService.openSnackBar("profesores cargados");
     this.dataSource.sort = this.sort;
     this.cargarProfesores();
    
 
    
     
   }
   cargarProfesores(): void {
     
     this._directService.lista().subscribe(data => {
       this.dataSource.data = data;
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
  const dialogRef = this.dialog.open(AddEditDirectivoComponent, {
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
    this._directService.delete(id).subscribe(() => {
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
