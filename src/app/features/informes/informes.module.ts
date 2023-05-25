import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { ListInformesComponent } from './list-informes/list-informes.component';
import { AddEditInformesComponent } from './add-edit-informes/add-edit-informes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MostrarInformeComponent } from './mostrar-informe/mostrar-informe.component';


@NgModule({
  declarations: [
    ListInformesComponent,
    AddEditInformesComponent,
    MostrarInformeComponent
  ],
  imports: [
    CommonModule,
    InformesRoutingModule,
    SharedModule
  ]
})
export class InformesModule { }
