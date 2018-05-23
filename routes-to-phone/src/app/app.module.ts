import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { DownloadComponent } from './download/download.component';
import { ReliabilityComponent } from './reliability/reliability.component';
import { AdminComponent } from './admin/admin.component';
import { AuditorPerformanceComponent } from './auditorPerformance/auditorperformance.component';
import { PickerPerformanceComponent } from './pickerPerformance/pickerperformance.component';
import { ChartComponent } from './chartPage/chart.component';

import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { DatabaseService } from './database.service';
import { SessionService } from './session.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewComponent,
    DownloadComponent,
    AdminComponent,
    AuditorPerformanceComponent,
    PickerPerformanceComponent,
    ReliabilityComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    routing,
    HttpModule
  ],
  providers: [DataService,
	      DatabaseService,
	      SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
