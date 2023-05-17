import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'informes',
    loadChildren: () => import('./features/informes/informes.module').then(m => m.InformesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'materias',
    loadChildren: () => import('./features/materias/materias.module').then(m => m.MateriasModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cursos',
    loadChildren: () => import('./features/cursos/cursos.module').then(m => m.CursosModule),
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'contenidos',
    loadChildren: () => import('./features/contenidos/contenidos.module').then(m => m.ContenidosModule),
    canActivate: [AuthGuard]
  }
  ,
  
  {
    path: 'alumnos',
    loadChildren: () => import('./features/Alumno/alumnos.module').then(m => m.AlumnosModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
