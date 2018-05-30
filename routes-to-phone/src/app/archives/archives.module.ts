import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../admin/admin.component';
import { PopoverModule } from 'ngx-popover';
import { PopoverFilterComponent } from '../popoverFilter/popoverFilter.component';
import { PopoverAuditorComponent } from '../popoverAuditor/popoverAuditor.component'; 
import { PopoverRouteComponent } from '../popoverRoute/popoverRoute.component';
import { PopoverDateComponent } from '../popoverDate/popoverDate.component';
import { PopoverCartPositionComponent } from '../popoverCartPosition/popoverCartPosition.component';
import { ChartComponent } from '../chartPage/chart.component';
import { ArchivesCenterRoutingModule } from './archives-routing.module';
import { ArchivesComponent } from './archives.component';
import { ManifestComponent } from '../manifest/manifest.component';
import { DataService } from '../data.service';
import { ArchivesService } from './archives.service';
import { ItemContentComponent } from '../itemContent/itemContent.component';

@NgModule({
  imports: [
    ArchivesCenterRoutingModule,
    PopoverModule,
    CommonModule
  ],
  declarations: [
    AdminComponent,
    PopoverFilterComponent,
    PopoverAuditorComponent,
    PopoverDateComponent,
    PopoverRouteComponent,
    PopoverCartPositionComponent,
    ItemContentComponent,
    ChartComponent,
    ArchivesComponent,
    ManifestComponent
  ],
  providers: [
    DataService,
    ArchivesService
  ]
})
export class ArchivesCenterModule {}

    
