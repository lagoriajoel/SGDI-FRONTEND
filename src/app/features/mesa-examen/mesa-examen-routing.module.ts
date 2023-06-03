import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { MostrarInformeMesaComponent } from './mostrar-informe-mesa/mostrar-informe-mesa.component';
import { ActualizarInformesComponent } from './actualizar-informes/actualizar-informes.component';

const routes: Routes = [
  {path: '', component:LayoutComponent,
  children:[
    { path:'listar', component: ActualizarInformesComponent},
    {path:'mostrar', component: MostrarInformeMesaComponent},
  
    { path:'**', redirectTo:'listar' }
  
  ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesaExamenRoutingModule { }
