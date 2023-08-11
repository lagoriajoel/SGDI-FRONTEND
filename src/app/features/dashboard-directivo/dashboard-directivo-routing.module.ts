import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ListarMateriasComponent } from './listar-materias/listar-materias.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'', component: LayoutComponent,
  children:[
    { path:'listar', component: ListarMateriasComponent },
    { path:'search', component: DashboardComponent },

  
    { path:'**', redirectTo:'listar' }
  
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardDirectivoRoutingModule { }
