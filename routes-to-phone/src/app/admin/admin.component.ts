import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';
import { Auditor } from '../models/auditor';
import { aDate } from '../models/date';
import { Router, NavigationExtras } from '@angular/router';
import { Route } from '../models/route';


@Component({
  selector: 'admin',
  moduleId: module.id,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent{
  arrayOfAuditors: Array<Auditor> = [];
  chartWeek1 = [];
  selectedMonth: number;
  selectedAuditor: Auditor; 
  label: string = "";
  data: Array<number> = [];
  backgroundColors: Array<string> = [];
  borderColors: Array<string> = [];
  labels: Array<string> = [];
  errorData: Array<number> = []; 
  errorBackgroundColors: Array<string> = [];  
  errorBorderColors: Array<string> = [];
  errorLabel: string = "";

  constructor(private dataService: DataService){
  }

  ngOnInit(){
    this.dataService.getAuditors().subscribe(res => this.compileAuditors(res)); 
  }

  compileAuditors(auditors: any){
    for(var i = 0; i < auditors.length; i++){
      var anAuditor = new Auditor();
      anAuditor.convertJSON(auditors[i]);
      this.arrayOfAuditors.push(anAuditor);
    } 
  }



  
  
  setMonth(event){
    this.selectedMonth = event;
    this.compileGraph();
  }

  setAuditor(event){
    this.selectedAuditor = event;

  }

    compileGraph(){

    this.label = this.selectedAuditor.firstName + " " + this.selectedAuditor.lastName + "'s items audited (in thousands)";
    this.errorLabel = this.selectedAuditor.firstName + " " + this.selectedAuditor.lastName + "'s errors found";
    console.log("the selected month is " + this.selectedMonth);
    for(var i = 0; i < this.selectedAuditor.arrayOfDates.length; i++){
      if(this.selectedAuditor.arrayOfDates[i].isMonth(this.selectedMonth)){
	console.log("HELLO WORLD");
	this.data.push(this.selectedAuditor.arrayOfDates[i].getNumberOfItemsAudited());
	this.errorData.push(this.selectedAuditor.arrayOfDates[i].errors.length); 
	this.backgroundColors.push("rgba(255, 99, 132, 0.2)");
	this.errorBackgroundColors.push("rgba(54, 162, 235, 0.2)");
	this.borderColors.push("rgba(255, 99, 132, 1)");
	this.errorBorderColors.push("rgba(54, 162, 235, 1)");
	var aLabel = "" + (this.selectedAuditor.arrayOfDates[i].theDate.getMonth()+1) + "/" + this.selectedAuditor.arrayOfDates[i].theDate.getDate() + "/" + this.selectedAuditor.arrayOfDates[i].theDate.getFullYear();
	this.labels.push(aLabel);
      }
    } 

  }

  compileDates(){
     
  }
}
