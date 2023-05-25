import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { AddEditAdminComponent } from './add-edit-admin/add-edit-admin.component';


@NgModule({
  declarations: [
    ListAdminComponent,
    AddEditAdminComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    SharedModule
  ]
})
export class AdministradorModule { }
