import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContenidosRoutingModule } from './contenidos-routing.module';
import { ListarContenidosComponent } from './listar-contenidos/listar-contenidos.component';
import { AddEditContenidosComponent } from './add-edit-contenidos/add-edit-contenidos.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListarContenidosComponent,
    AddEditContenidosComponent
  ],
  imports: [
    CommonModule,
    ContenidosRoutingModule,
    SharedModule
  ]
})
export class ContenidosModule { }
