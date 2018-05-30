import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { ArchivesComponent } from './archives.component';
import { ManifestComponent } from '../manifest/manifest.component';
import { ItemContentComponent } from '../itemContent/itemContent.component';

const archiveRoutes: Routes = [
  {
    path: '',
    component: ArchivesComponent,
    children: [
      {
	path: '',
	component: AdminComponent
      },
      {
	path: 'manifest',
	component: ManifestComponent
      },
      {
	path: 'itemContent',
	component: ItemContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(archiveRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})

export class ArchivesCenterRoutingModule {}



