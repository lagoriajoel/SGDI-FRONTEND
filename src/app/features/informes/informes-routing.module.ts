import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ListInformesComponent } from './list-informes/list-informes.component';

const routes: Routes = [
  {path:'', component: LayoutComponent,
  children:[
    { path:'listar/:id/:idAsignatura', component: ListInformesComponent },
  
    { path:'**', redirectTo:'listar' }
  
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformesRoutingModule { }
