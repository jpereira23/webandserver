import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Auditor } from '../models/auditor';
import { Route } from '../models/route';

@Component({
  selector: 'popover-route',
  moduleId: module.id,
  templateUrl: './popoverRoute.component.html',
  styleUrls: ['./popoverRoute.component.css']
})

export class PopoverRouteComponent implements OnChanges{
  @Input() selectedAuditor: Auditor;
  @Input() selectedDate: Date;
  @Output() selectedRoute = new EventEmitter<Route>();
  arrayOfRoutes: Array<Route> = [];
  constructor(){
    
  }

  ngOnChanges(changes: SimpleChanges){
    var tmpChange: SimpleChange = changes.selectedDate;
    console.log(tmpChange.previousValue);
    this.selectedDate = changes.selectedDate.currentValue;
    this.selectedAuditor = changes.selectedAuditor.currentValue;
    console.log(this.selectedDate);
    console.log(this.selectedAuditor);
    var theSelectedDate = new Date(this.selectedDate);
    if(this.selectedAuditor != null){
      for(var i = 0; i < this.selectedAuditor.arrayOfDates.length; i++){
	var aDate = new Date(this.selectedAuditor.arrayOfDates[i].theDate);
	if(aDate.getMonth() == theSelectedDate.getMonth() && aDate.getDate() == theSelectedDate.getDate() && aDate.getFullYear() == theSelectedDate.getFullYear()){
	  this.arrayOfRoutes = this.selectedAuditor.arrayOfDates[i].routes;
	}
      }
    }
    console.log(this.arrayOfRoutes);
  }

  routeSelected(i: number){
    this.selectedRoute.emit(this.arrayOfRoutes[i]);   
  }
} 
