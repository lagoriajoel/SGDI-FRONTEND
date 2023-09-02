import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Alumno } from 'src/app/core/Entities/alumno';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { AddEditProfesoresComponent } from '../../profesor/add-edit-profesores/add-edit-profesores.component';
import { changePasswordDto } from 'src/app/core/Entities/changePasswordDto';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-alumno-user',
  templateUrl: './alumno-user.component.html',
  styleUrls: ['./alumno-user.component.css']
})
export class AlumnoUserComponent implements OnInit {
  loading: boolean=false
  alumnos:Alumno[]=[];
 
   displayedColumns: string[] = ["dni","nombre","apellido","email","acciones"];
   dataSource = new MatTableDataSource(this.alumnos);
  
   @ViewChild(MatSort, { static: true })
   sort: MatSort = new MatSort();
   @ViewChild(MatPaginator)
  private _paginator!: MatPaginator;
  public get paginator(): MatPaginator {
    return this._paginator;
  }
  public set paginator(value: MatPaginator) {
    this._paginator = value;
  }
   constructor(
    
     private notificationService: NotificationService,
     private titleService: Title,
    private alumnosService: AlumnoService,
     public dialog: MatDialog,
     private _snackBar: MatSnackBar,
     private authService: AuthenticationService
   
    
 
   ) {
     this.dataSource = new MatTableDataSource();
   }
 
   ngOnInit() {
     this.titleService.setTitle("Gestion de Informes - Profesores");
   

     this.dataSource.sort = this.sort;
     this.cargarProfesores();
    
 
    
     
   }
   cargarProfesores(): void {
     
     this.alumnosService.lista().subscribe(data => {
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

   changePassword(dni: string) {

   
    this.authService.listByUsername(dni).subscribe({
      next: data=>{
        console.log(data);
       

        const changePassword: changePasswordDto ={
          currentPassword: "",
          newPassword: data.nombreUsuario!
      }
     
      this.authService.blanquearPassword(changePassword, data.nombreUsuario!)
        .subscribe({
       
         next: data => {
  
           this.notificationService.openSnackBar('Su contraseña ha sido actualizada correctamente.');
          
          },
  
        error:  error => {
            this.notificationService.openSnackBar(error.error.Mensaje);
          }
    });



      }
    } );
  
   }
 
   deleteProfesor(id: number) {
     
    this.dialog.open(ConfirmDialogComponent, {
      width: "500px",
      disableClose: true,
   data: {
    title:"Eliminar Profesor",
    message:"¿Esta seguro de eliminar el Profesor?"
   }
   

    }).afterClosed().subscribe((res) => {

     if(res){
      
      this.alumnosService.delete(id).subscribe(() => {
        this.cargarProfesores();
        this.mensajeExito();
      })

     }

    });

    
 
   
   }
   mensajeExito() {
     this._snackBar.open('El usuario fue eliminado con exito', '', {
       duration: 2000
     });

}
}
