import { SharedModule } from 'src/app/shared/shared.module';
import { ListarAlumnosComponent } from './listar-alumnos/listar-alumnos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AddEditAlumnosComponent } from './add-edit-alumnos/add-edit-alumnos.component';
import { AddAlumnoCursoComponent } from './add-alumno-curso/add-alumno-curso.component';


@NgModule({
  declarations: [
    ListarAlumnosComponent,
    AddEditAlumnosComponent,
    AddAlumnoCursoComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule
  ]
})
export class AlumnosModule { }
