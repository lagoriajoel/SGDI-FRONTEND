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
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { changePasswordDto } from 'src/app/core/Entities/changePasswordDto';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

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
     private authService: AuthenticationService,
   
     private _liveAnnouncer: LiveAnnouncer,
    
 
   ) {
     this.dataSource = new MatTableDataSource();
   }
 
   ngOnInit() {
     this.titleService.setTitle("Gestion de Informes - Profesores");
    
     
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
  title:"Eliminar Directivo",
  message:"¿Esta seguro de eliminar el usuario?"
 }
 

  }).afterClosed().subscribe((res) => {

   if(res){
    
    this._directService.delete(id).subscribe(() => {
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
