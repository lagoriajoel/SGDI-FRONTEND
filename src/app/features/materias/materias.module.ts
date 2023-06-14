import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MateriasRoutingModule } from './materias-routing.module';
import { ListarMateriasComponent } from './listar-materias/listar-materias.component';
import { AddEditMateriasComponent } from './add-edit-materias/add-edit-materias.component';
import { MostrarMateriasComponent } from './mostrar-materias/mostrar-materias.component';
import { AsignarProfesorComponent } from './asignar-profesor/asignar-profesor.component';
import { DetalleMateriaComponent } from './detalle-materia/detalle-materia.component';
import { DashboardMateriasComponent } from './dashboard-materias/dashboard-materias.component';


@NgModule({
  declarations: [
    ListarMateriasComponent,
    AddEditMateriasComponent,
    MostrarMateriasComponent,
    AsignarProfesorComponent,
    DetalleMateriaComponent,
    DashboardMateriasComponent
  ],
  imports: [
    CommonModule,
    MateriasRoutingModule,
    SharedModule
  ]
})
export class MateriasModule { }
