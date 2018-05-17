import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../session.service';

import { Chart } from 'chart.js';
import { aDate } from '../models/date';
import { Route } from '../models/route';
import { Status } from '../models/status'; 
import { Item } from '../models/item';
import { Error } from '../models/error';

@Component({
  selector: 'chart',
  moduleId: module.id,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})


export class ChartComponent{

  data = [];
  backgroundColors = [];
  borderColors = [];
  labels = [];
  label = "";
  chartWeek1 = [];
  errorLabel = "";
  errorBackgroundColors = [];
  errorBorderColors = [];
  errorData = [];
  routes: Array<Route> = [];
  statuss: Array<Status> = [];
  statusView: boolean = false;
  itemView: boolean = false;
  selectedStops: Array<string> = [];
  routeIndex: number = 0;
  stopIndex: number = 0; 
  theItem: Array<Item> = [];
  errors: Array<Error> = [];
  errorTypes: Array<string> = ["Missing Cart Handle", "Damaged Cart Wheel", "Mis-Picks", "Wrap Issue", "Bun Error", "Shorts", "Wrong Cart", "Overages"];

  constructor(private route: ActivatedRoute, private sessionService: SessionService){
  }

  dateSelected(i: number){
    this.routes = this.sessionService.currentDates[i].routes;
    this.errors = this.sessionService.currentDates[i].errors;
    console.log(this.routes);
  }

  selectRoute(j: number){
    this.routeIndex = j;
    this.statuss = this.routes[j].statuss;
    for(var k = 0; k < this.statuss[0].stops.length; k++)
    {
      this.selectedStops.push(this.statuss[0].stops[k].stopNumber); 
    }
    this.statusView = true;
  }

  previous(){
    if(this.itemView == true){
      this.itemView = false;
      this.statusView = true;
    }
    else if(this.statusView == true){
      this.statusView = false;
    }
  }

  stopSelected(m: number){
    this.stopIndex = m; 
  }

  cartPositionSelected(cartIndex: number, statusIndex: number){
    this.theItem = this.routes[this.routeIndex].statuss[statusIndex].stops[this.stopIndex].cartPositions[cartIndex].items; 
    this.statusView = false;
    this.itemView = true;
   
  }


  ngOnInit(){

    
    this.route.queryParams.subscribe(params => {
      this.data = params["data"];
      this.backgroundColors = params["backgroundColors"];
      this.borderColors = params["borderColors"];
      this.labels = params["labels"];
      this.label = params["label"];
      this.errorData = params["errorData"];
      this.errorBackgroundColors = params["errorBackgroundColors"];
      this.errorBorderColors = params["errorBorderColors"];
      this.errorLabel = params["errorLabel"];
      this.chartWeek1 = new Chart('canvas1', {
	type: 'line', 
	data: {
	  labels: this.labels, 
	  datasets: [{
	    label: this.label,
	    data: this.data,
	    backgroundColor: this.backgroundColors,
	    borderColor: this.borderColors,
	    borderWidth: 1
	    }, {
	      label: this.errorLabel,
	      data: this.errorData,
	      backgroundColor: this.errorBackgroundColors,
	      borderColor: this.errorBorderColors,
	      borderWidth: 1
	    }]
	},
	options: {
	  scales: {
	    yAxes: [{
	      ticks: {
		beginAtZero: true
	      }
	    }]
	  }
	}
      });
    });
  }

}



