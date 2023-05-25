import { ListarMateriasComponent } from './listar-materias/listar-materias.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component:LayoutComponent,
  children:[
    { path:'listar', component: ListarMateriasComponent },
  
    { path:'**', redirectTo:'listar' }
  
  ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriasRoutingModule { }
