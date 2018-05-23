import { ModuleWithProviders, Input } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { DownloadComponent } from './download/download.component';
import { AdminComponent } from './admin/admin.component';
import { AuditorPerformanceComponent } from './auditorPerformance/auditorperformance.component';
import { PickerPerformanceComponent } from './pickerPerformance/pickerperformance.component';
import { ChartComponent } from './chartPage/chart.component';
import { ReliabilityComponent } from './reliability/reliability.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
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
    path: 'download',
    component: DownloadComponent
  },
  {
    path: 'admin',
    component: AdminComponent
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
    path: 'chart',
    component: ChartComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
