import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProfesoresComponent } from './listar-profesores/listar-profesores.component';

import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const routes: Routes = [

  {path:'', component: LayoutComponent,
  children:[
    { path:'listar', component: ListarProfesoresComponent },
  
    { path:'**', redirectTo:'listar' }
  
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorRoutingModule { }
