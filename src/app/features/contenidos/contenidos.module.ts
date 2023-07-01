import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContenidosRoutingModule } from './contenidos-routing.module';
import { ListarContenidosComponent } from './listar-contenidos/listar-contenidos.component';
import { AddEditContenidosComponent } from './add-edit-contenidos/add-edit-contenidos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContenidosComponent } from './contenidos/contenidos.component';
import { CriteriosEstrategiasComponent } from './criterios-estrategias/criterios-estrategias.component';
import { AddEditCriteriosComponent } from './add-edit-criterios/add-edit-criterios.component';
import { EstrategiasComponent } from './estrategias/estrategias.component';
import { AddEditEstrategiasComponent } from './add-edit-estrategias/add-edit-estrategias.component';


@NgModule({
  declarations: [
    ListarContenidosComponent,
    AddEditContenidosComponent,
    ContenidosComponent,
    CriteriosEstrategiasComponent,
    AddEditCriteriosComponent,
    EstrategiasComponent,
    AddEditEstrategiasComponent
  ],
  imports: [
    CommonModule,
    ContenidosRoutingModule,
    SharedModule
  ]
})
export class ContenidosModule { }
