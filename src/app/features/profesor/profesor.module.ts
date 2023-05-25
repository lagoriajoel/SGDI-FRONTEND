import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorRoutingModule } from './profesor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListarProfesoresComponent } from './listar-profesores/listar-profesores.component';
import { AddEditProfesoresComponent } from './add-edit-profesores/add-edit-profesores.component';


@NgModule({
  declarations: [
      ListarProfesoresComponent,
      AddEditProfesoresComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    SharedModule
  ]
})
export class ProfesorModule { }
