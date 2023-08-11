import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { ListInformesComponent } from './list-informes/list-informes.component';
import { AddEditInformesComponent } from './add-edit-informes/add-edit-informes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MostrarInformeComponent } from './mostrar-informe/mostrar-informe.component';
import { ActualizarDiciembreFebreroComponent } from './actualizar-diciembre-febrero/actualizar-diciembre-febrero.component';
import { MostrarIInformeFebreroComponent } from './mostrar-i-informe-febrero/mostrar-i-informe-febrero.component';
import { GraficosComponent } from './graficos/graficos.component';
import { Grafico2Component } from './estadisticas/grafico2/grafico2.component';
import { EstadisticasComponent } from './estadisticas/estadisticas/estadisticas.component';


@NgModule({
  declarations: [
    ListInformesComponent,
    AddEditInformesComponent,
    MostrarInformeComponent,
    ActualizarDiciembreFebreroComponent,
    MostrarIInformeFebreroComponent,
    GraficosComponent,
    Grafico2Component,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    InformesRoutingModule,
    SharedModule
  ]
})
export class InformesModule { }
