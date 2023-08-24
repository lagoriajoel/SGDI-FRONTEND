import { ListarMateriasComponent } from './listar-materias/listar-materias.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarInformeComponent } from '../informes/mostrar-informe/mostrar-informe.component';
import { MostrarMateriasComponent } from './mostrar-materias/mostrar-materias.component';
import { DetalleMateriaComponent } from './detalle-materia/detalle-materia.component';
import { DashboardMateriasComponent } from './dashboard-materias/dashboard-materias.component';
import { AddEditMateriasComponent } from './add-edit-materias/add-edit-materias.component';
import { ListarMateriasCursoComponent } from './listar-materias-curso/listar-materias-curso.component';

const routes: Routes = [
  {path: '', component:LayoutComponent,
  children:[
    { path:'listar', component: ListarMateriasComponent },
    {path:'mostrar', component: DashboardMateriasComponent},
    {path:'detalles/:id', component: DetalleMateriaComponent},
    {path:'addeditmaterias', component: AddEditMateriasComponent},
    {path:'listarMaterias', component: ListarMateriasCursoComponent},




  
    { path:'**', redirectTo:'listar' }
  
  ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriasRoutingModule { }
