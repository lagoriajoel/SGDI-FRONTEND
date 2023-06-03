import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardAlumnosComponent } from './dashboard-alumnos/dashboard-alumnos.component';

@NgModule({
    declarations: [DashboardHomeComponent, DashboardAlumnosComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule
    ]
})
export class DashboardModule { }
