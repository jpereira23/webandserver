import { ModuleWithProviders, Input } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { AuditorPerformanceComponent } from './auditorPerformance/auditorperformance.component';
import { PickerPerformanceComponent } from './pickerPerformance/pickerperformance.component';
import { ReliabilityComponent } from './reliability/reliability.component';
import { ArchivesComponent } from './archives/archives.component';
import { AuditingComponent } from './auditing/auditing.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/auditing/auditing.module#AuditingCenterModule',
    data: { preload: true }
  },
  {
    path: 'reliability',
    component: ReliabilityComponent
  },
  {
    path: 'view',
    component: ViewComponent
  },
  {
    path: 'auditor',
    component: AuditorPerformanceComponent
  },
  {
    path: 'picker',
    component: PickerPerformanceComponent
  },
  {
    path: 'archives',
    loadChildren: 'app/archives/archives.module#ArchivesCenterModule',
    data: { preload: true }
  },
  {
    path: 'auditing',
    loadChildren: 'app/auditing/auditing.module#AuditingCenterModule',
    data: { preload: true }
  }


];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
