import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
//import { DownloadComponent } from './download/download.component';
import { ReliabilityComponent } from './reliability/reliability.component';
import { AuditorPerformanceComponent } from './auditorPerformance/auditorperformance.component';
import { PickerPerformanceComponent } from './pickerPerformance/pickerperformance.component';

import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { DatabaseService } from './database.service';
import { SessionService } from './session.service';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    //DownloadComponent,
    AuditorPerformanceComponent,
    PickerPerformanceComponent,
    ReliabilityComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule
  ],
  providers: [DataService,
	      DatabaseService,
	      SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
