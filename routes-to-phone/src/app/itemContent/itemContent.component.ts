import { Component, Input, OnInit } from '@angular/core';
import { CartPosition } from '../models/cartPosition';
import { Auditor } from '../models/auditor';
import { Route } from '../models/route';
import { ArchivesService } from '../archives/archives.service';

@Component({
  selector: 'item-content',
  moduleId: module.id,
  templateUrl: './itemContent.component.html',
  styleUrls: ['./itemContent.component.css']
})

export class ItemContentComponent {
  selectedAuditor: Auditor = null;
  selectedDate: Date = new Date();
  selectedRoute: Route;
  routeSelected: boolean = false;
  selectedCartPosition: CartPosition;
  
  constructor(private archivesService: ArchivesService){
  }
  
  setRoute(event){
    this.selectedRoute = event;
    this.routeSelected = true;  
  }

  setCartPosition(event){
    this.selectedCartPosition = event;
  }
}
