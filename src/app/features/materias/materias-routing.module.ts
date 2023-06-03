import { ListarMateriasComponent } from './listar-materias/listar-materias.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarInformeComponent } from '../informes/mostrar-informe/mostrar-informe.component';
import { MostrarMateriasComponent } from './mostrar-materias/mostrar-materias.component';

const routes: Routes = [
  {path: '', component:LayoutComponent,
  children:[
    { path:'listar', component: ListarMateriasComponent },
    {path:'mostrar', component: MostrarMateriasComponent},
  
    { path:'**', redirectTo:'listar' }
  
  ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriasRoutingModule { }
