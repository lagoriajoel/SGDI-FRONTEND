import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Alumno } from 'src/app/core/Entities/alumno';
import { Informes } from 'src/app/core/Entities/informe';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  
  
  nombreUsuario: string=''
  usuario: string=''
  isAdmin: boolean = false;
  isProfesor: boolean = false; //
 
  constructor(
   private authService: AuthenticationService,
   private notificationService: NotificationService,
   private alumnoService: AlumnoService,
   private router: Router,
   private snackBarService: MatSnackBar,
   private titleService: Title,
  ) {
    
  }

  ngOnInit() {
    
    this.titleService.setTitle("SiGeID - Dashboard");
     this.nombreUsuario=this.authService.getName()
     this.isAdmin = this.authService.isAdmin();
   
     this.isProfesor=this.authService.isProfesor();
     
     if(this.isAdmin){
         this.usuario= 'Administrador :';
     }
     else if(this.isProfesor){
         this.usuario='Profesor :';
     }

  }


  

  
}
