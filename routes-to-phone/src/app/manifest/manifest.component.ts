import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Auditor } from '../models/auditor';
import { Route } from '../models/route';
import { CartPosition } from '../models/cartPosition';
import { ArchivesService } from '../archives/archives.service';

@Component({
  selector: 'manifest',
  moduleId: module.id,
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.css']
})

export class ManifestComponent{
  arrayOfAuditors: Array<Auditor> = [];
  filteredArrayOfAuditors: Array<Auditor> = [];
  selectedAuditor: Auditor;
  auditorSelected: boolean = false;
  selectedDate: Date;
  dateSelected: boolean = false;
  selectedRoute: Route;
  routeSelected: boolean = false;
  selectedCartPosition: CartPosition;
  constructor(private dataService: DataService, private archivesService: ArchivesService, private router: Router){
    this.dataService.getAuditors().subscribe(res => this.compileAuditors(res));
  }

  compileAuditors(auditors: any){
    for(var i = 0; i < auditors.length; i++){
      var anAuditor = new Auditor();
      anAuditor.convertJSON(auditors[i]);
      this.arrayOfAuditors.push(anAuditor);
    } 
  }

  setDate(event){
    this.selectedDate = event;
    this.filterAuditors();
  }

  auditorSelection(i: number){
     this.archivesService.setDelivarables(this.filteredArrayOfAuditors[i], this.selectedDate);
     this.router.navigate(['/archives/itemContent']);
  }

  filterAuditors(){
    for(var i = 0; i < this.arrayOfAuditors.length; i++){
      for(var j = 0; j < this.arrayOfAuditors[i].arrayOfDates.length; j++){
	var aSelectedDate = new Date(this.selectedDate);
	var dateAnalyzed = new Date(this.arrayOfAuditors[i].arrayOfDates[j].theDate);

	if(aSelectedDate.getMonth() == dateAnalyzed.getMonth() && aSelectedDate.getFullYear() == dateAnalyzed.getFullYear() && aSelectedDate.getDate() == dateAnalyzed.getDate()){
	    this.filteredArrayOfAuditors.push(this.arrayOfAuditors[i]);
	}
      }
    }
  }

  setRoute(event){
    this.selectedRoute = event;
    this.routeSelected = true;
  }

  setAuditor(event){
    this.selectedAuditor = event;
    console.log(this.selectedAuditor);
    this.auditorSelected = true;
  }

  setCartPosition(event){
    this.selectedCartPosition = event;
  }
}
