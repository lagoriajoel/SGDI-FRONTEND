import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListarProfesoresComponent } from '../profesor/listar-profesores/listar-profesores.component';
import { ProfesorUserComponent } from './profesor-user/profesor-user.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { DirectivoUserComponent } from './directivo-user/directivo-user.component';
import { AddEditDirectivoComponent } from './add-edit-directivo/add-edit-directivo.component';
import { AlumnoUserComponent } from './alumno-user/alumno-user.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UserListComponent, ProfesorUserComponent, AdminUserComponent, DirectivoUserComponent, AddEditDirectivoComponent, AlumnoUserComponent]
})
export class UsersModule { }
