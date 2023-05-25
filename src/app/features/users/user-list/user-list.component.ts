import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

 


  displayedColumns: string[] = ["anio",
  "Division",
  "turno",
  "Ciclo Lectivo",
  "acciones",
  "contenidos"];
  dataSource = new MatTableDataSource();


  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle(' Usuarios');
    this.logger.log('Usuarios cargados');
  }

  irAprofesores(){
   
    console.log("ir a profesores");
    this.router.navigate(['/profesor']);
  }
  
  irAadministradores(){
   
    console.log("ir a admin");
    this.router.navigate(['/administradores']);
  }
}
