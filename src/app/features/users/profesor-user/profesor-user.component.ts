import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/core/Entities/profesor';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { AddEditProfesoresComponent } from '../../profesor/add-edit-profesores/add-edit-profesores.component';

@Component({
  selector: 'app-profesor-user',
  templateUrl: './profesor-user.component.html',
  styleUrls: ['./profesor-user.component.css']
})
export class ProfesorUserComponent implements OnInit {
  loading: boolean=false
  profesores:Profesor[]=[];
 
   displayedColumns: string[] = ["dni","nombre","apellido","email","acciones"];
   dataSource = new MatTableDataSource(this.profesores);
  
   @ViewChild(MatSort, { static: true })
   sort: MatSort = new MatSort();
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   constructor(
    
     private notificationService: NotificationService,
     private titleService: Title,
     private profesorService: ProfesorService,
     public dialog: MatDialog,
     private _snackBar: MatSnackBar,
   
    
 
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
     
     this.profesorService.lista().subscribe(data => {
       this.dataSource.data = data;
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      
     })
     
   }
 
 
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   }
 
   addEditProfesor(id?: number) {
     const dialogRef = this.dialog.open(AddEditProfesoresComponent, {
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
       this.profesorService.delete(id).subscribe(() => {
         this.cargarProfesores();
         this.mensajeExito();
       })
     }, 1000);
   }
   mensajeExito() {
     this._snackBar.open('La persona fue eliminada con exito', '', {
       duration: 2000
     });

}}
