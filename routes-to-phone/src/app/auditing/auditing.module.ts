import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditingComponent } from './auditing.component';
import { FileUploadModule } from 'ng2-file-upload';
import { HomeComponent } from '../home/home.component';
import { AuditingCenterRoutingModule } from './auditing-routing.module';
import { DownloadComponent } from '../download/download.component';

@NgModule({
  imports: [
    CommonModule,
    AuditingCenterRoutingModule,
    FileUploadModule
  ], 
  declarations: [
    AuditingComponent,
    HomeComponent,
    DownloadComponent
  ],
  providers: [

  ]
})
export class AuditingCenterModule {}
