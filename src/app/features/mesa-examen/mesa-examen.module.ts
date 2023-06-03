import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesaExamenRoutingModule } from './mesa-examen-routing.module';
import { MostrarInformeMesaComponent } from './mostrar-informe-mesa/mostrar-informe-mesa.component';
import { ActualizarInformesComponent } from './actualizar-informes/actualizar-informes.component';


@NgModule({
  declarations: [
    MostrarInformeMesaComponent,
    ActualizarInformesComponent
  ],
  imports: [
    CommonModule,
    MesaExamenRoutingModule
  ]
})
export class MesaExamenModule { }
