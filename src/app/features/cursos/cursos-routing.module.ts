
import { ListarComponent } from './pages/listar/listar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const routes: Routes = [

  {path:'', component: LayoutComponent,
  children:[
    { path:'listar', component: ListarComponent },
  
    { path:'**', redirectTo:'listar' }
  
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
