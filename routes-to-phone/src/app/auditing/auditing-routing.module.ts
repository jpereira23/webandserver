import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditingComponent } from './auditing.component';
import { HomeComponent } from '../home/home.component';
import { DownloadComponent } from '../download/download.component';

const auditingRoutes: Routes = [
  {
    path: '',
    component: AuditingComponent,
    children: [
      {
	path: '',
	component: HomeComponent
      },
      {
	path: 'download',
	component: DownloadComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(auditingRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})


export class AuditingCenterRoutingModule {}
