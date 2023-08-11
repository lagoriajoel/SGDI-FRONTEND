import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardDirectivoRoutingModule } from './dashboard-directivo-routing.module';
import { ListarMateriasComponent } from './listar-materias/listar-materias.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    ListarMateriasComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardDirectivoRoutingModule,
    SharedModule
  ]
})
export class DashboardDirectivoModule { }
