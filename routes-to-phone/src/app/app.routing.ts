import { ModuleWithProviders, Input } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { DownloadComponent } from './download/download.component';
import { AdminComponent } from './admin/admin.component';
import { AuditorPerformanceComponent } from './auditorPerformance/auditorperformance.component';
import { PickerPerformanceComponent } from './pickerPerformance/pickerperformance.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
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
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
