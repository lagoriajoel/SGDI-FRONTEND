import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard], 
   
  },
  {
    path: 'dashboardProfesor',
    loadChildren: () => import('./features/dashboard-profesor/dashboar-profesor.module').then(m => m.DashboarProfesorModule),
    canActivate:  [AdminGuard], data: {expectedRol: ['profesor']}
  },
  {
    path: 'informes',
    loadChildren: () => import('./features/informes/informes.module').then(m => m.InformesModule),
    canActivate: [AdminGuard], data: {expectedRol: ['admin', 'profesor','directivo']}
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'materias',
    loadChildren: () => import('./features/materias/materias.module').then(m => m.MateriasModule),
    canActivate:  [AdminGuard], data: {expectedRol: ['admin']}
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [AdminGuard], data: {expectedRol: ['user', 'admin', 'profesor','directivo']}
  },
  
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate:  [AdminGuard], data: {expectedRol: ['admin']}
  },
  {
    path: 'profesor',
    loadChildren: () => import('./features/profesor/profesor.module').then(m => m.ProfesorModule),
    canActivate:  [AdminGuard], data: {expectedRol: ['admin']}
  },
  {
    path: 'administradores',
    loadChildren: () => import('./features/administrador/administrador.module').then(m => m.AdministradorModule),
    canActivate:  [AdminGuard], data: {expectedRol: ['admin']}
  },
  {
    path: 'cursos',
    loadChildren: () => import('./features/cursos/cursos.module').then(m => m.CursosModule),
    canActivate:  [AdminGuard], data: {expectedRol: ['admin','directivo']}
  },
  {
    path: 'mesa',
    loadChildren: () => import('./features/mesa-examen/mesa-examen.module').then(m => m.MesaExamenModule),
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'contenidos',
    loadChildren: () => import('./features/contenidos/contenidos.module').then(m => m.ContenidosModule),
    canActivate: [AdminGuard], data: {expectedRol: ['admin', 'profesor']}
  }
  ,
  
  {
    path: 'alumnos',
    loadChildren: () => import('./features/Alumno/alumnos.module').then(m => m.AlumnosModule),
    canActivate:  [AdminGuard], data: {expectedRol: ['admin','directivo']}
  },
  {
    path: 'directivo',
    loadChildren: () => import('./features/dashboard-directivo/dashboard-directivo.module').then(m => m.DashboardDirectivoModule),
    canActivate:  [AdminGuard], data: {expectedRol: ['directivo', 'admin']}
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
