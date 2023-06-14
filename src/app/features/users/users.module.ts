import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListarProfesoresComponent } from '../profesor/listar-profesores/listar-profesores.component';
import { ProfesorUserComponent } from './profesor-user/profesor-user.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UserListComponent, ProfesorUserComponent, AdminUserComponent]
})
export class UsersModule { }
