import { ModuleWithProviders, Input } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { DownloadComponent } from './download/download.component';
import { AdminComponent } from './admin/admin.component';

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
  }  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
