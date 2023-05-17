import { ListarAlumnosComponent } from './listar-alumnos/listar-alumnos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const routes: Routes = [

  {path:'', component: LayoutComponent,
  children:[
    { path:'listar/:id', component: ListarAlumnosComponent },
  
    { path:'**', redirectTo:'listar' }
  
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
