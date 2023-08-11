import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ListInformesComponent } from './list-informes/list-informes.component';
import { ActualizarDiciembreFebreroComponent } from './actualizar-diciembre-febrero/actualizar-diciembre-febrero.component';
import { GraficosComponent } from './graficos/graficos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas/estadisticas.component';

const routes: Routes = [
  {path:'', component: LayoutComponent,
  children:[
    { path:'listar', component: ListInformesComponent },
    { path:'actualizarInforme', component: ActualizarDiciembreFebreroComponent },
    { path:'graficos', component: EstadisticasComponent },

  
    { path:'**', redirectTo:'listar' }
  
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformesRoutingModule { }
