import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboarProfesorRoutingModule } from './dashboar-profesor-routing.module';
import { MisContenidosComponent } from './mis-contenidos/mis-contenidos.component';
import { MisMateriasComponent } from './mis-materias/mis-materias.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardHomeProfesorComponent } from './dashboard-home-profesor/dashboard-home-profesor.component';


@NgModule({
  declarations: [DashboardHomeProfesorComponent, MisContenidosComponent, MisMateriasComponent],
  imports: [
    CommonModule,
    DashboarProfesorRoutingModule,
    SharedModule
  ]
})
export class DashboarProfesorModule { }