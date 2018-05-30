import { Component, Input } from '@angular/core';
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

  @Input() data: Array<string> = [];
  @Input() backgroundColors: Array<string> = [];
  @Input() borderColors: Array<string> = [];
  @Input() labels: Array<string> = [];
  @Input() label: string = "";
  @Input() errorData: Array<string> = [];
  @Input() errorBackgroundColors: Array<string> = [];
  @Input() errorBorderColors: Array<string> = [];
  @Input() errorLabel: string = "";
  chartWeek1: Chart = null;
  isSet: boolean = false;

  constructor(private route: ActivatedRoute, private sessionService: SessionService){
  }

  ngOnChanges(){
    this.isSet = true;
    this.chartWeek1 = null;
    this.chartWeek1 = new Chart('canvas1', {
	type: 'line', 
	data: {
	  labels: this.labels, 
	  datasets: [{
	    label: this.label,
	    data: this.data,
	    backgroundColor: this.backgroundColors,
	    borderColor: this.borderColors,
	    fontColor: "#FFFFFF",
	    borderWidth: 1
	    } /*{
	      label: this.errorLabel,
	      data: this.errorData,
	      backgroundColor: this.errorBackgroundColors,
	      borderColor: this.errorBorderColors,
	      borderWidth: 1
	      }*/]
	},
	options: {
	  legend: {
	      labels:{
		fontColor: "#FFFFFF"
	      } 
	    },
	    scales: {
	    yAxes: [{
	      gridLines:{
		display: true,
		color: "#FFFFFF"
	      },
	      ticks: {
		beginAtZero: true,
		color: "#FFFFFF",
		fontColor: "#FFFFFF"
	      }
	      }],
	  }
	}
    });
  }
  ngOnInit(){
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
	    } /* {
	      label: this.errorLabel,
	      data: this.errorData,
	      fontColor: "#FFFFFF",
	      backgroundColor: this.errorBackgroundColors,
	      borderColor: this.errorBorderColors,
	      borderWidth: 1
	      }*/]
	},
	options: {
	  scales: {
	    yAxes: [{
	      gridLines:{
		display: true,
		color: "#FFFFFF"
	      },
	      ticks: {
		beginAtZero: true,
		fontColor: "#FFFFFF"
	      }
	    }]
	  }
	}
    });
  }
}



