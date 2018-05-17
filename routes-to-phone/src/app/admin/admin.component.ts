import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';
import { Auditor } from '../models/auditor';
import { aDate } from '../models/date';
import { Router, NavigationExtras } from '@angular/router';
import { Route } from '../models/route';
import { SessionService } from '../session.service';


@Component({
  selector: 'admin',
  moduleId: module.id,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent{
  used: number;
  capacity: number;
  logs: Array<string> = [];
  arrayOfAuditors: Array<Auditor> = [];
  datesArray: Array<any> = [];
  auditor: Auditor = null;
  aMonth: number = 0;
  section: number = 1;
  chartWeek1 = [];
  selectedDates: Array<aDate> = [];

  constructor(private databaseService: DatabaseService, private dataService: DataService, private router: Router, private sessionService: SessionService){
    this.databaseService.getStorageDetails().subscribe(res => this.delegateForStorage(res)); 
    this.databaseService.getLog().subscribe(res => this.delegateForLog(res));
  }

  ngOnInit(){
    this.dataService.getArchives().subscribe(res => this.compileDates(res)); 
  }

  compileDates(dates: any){
    console.log(dates); 
    this.datesArray = dates;
    for(var i = 0; i < dates.length; i++){
      for(var j = 0; j < dates[i].auditors.length; j++){
	if(this.checkIfAuditorExists(dates[i].auditors[j]) == false)
	{
	  var anAuditor = new Auditor(dates[i].auditors[j].firstName, dates[i].auditors[j].lastName);
	  var anDate = new Date(dates[i].theDate);
	  dates[i].theDate = anDate;
	  anAuditor.addDate(anDate);
	  anAuditor.arrayOfDates.push(dates[i]);
	  this.arrayOfAuditors.push(anAuditor);
	}
      }
    } 
  }

  checkIfAuditorExists(anAuditor: any){
    for(var i = 0; i < this.arrayOfAuditors.length; i++){
      if(anAuditor.firstName == this.arrayOfAuditors[i].firstName && anAuditor.lastName == this.arrayOfAuditors[i].lastName)
      {
	return true;
      }
    }
    return false;
  }

  delegateForStorage(response){
    console.log(response);
    this.used = Math.round(response.fsUsedSize * 100) / 100;
    this.capacity = Math.round(response.fsTotalSize * 100) / 100;
  }

  setAuditor(i: number){
    this.auditor = this.arrayOfAuditors[i];
  }

  setMonth(i: number){
    console.log(this.auditor.arrayOfMonths[i]);
    console.log(i);
    if(this.auditor.arrayOfMonths[i] == "January"){
      this.aMonth = 1;
    }
    else if(this.auditor.arrayOfMonths[i] == "February"){
      this.aMonth = 2;
    }
    else if(this.auditor.arrayOfMonths[i] == "March"){
      this.aMonth = 3;
    }
    else if(this.auditor.arrayOfMonths[i] == "April"){
      this.aMonth = 4;
    }
    else if(this.auditor.arrayOfMonths[i] == "May"){
      this.aMonth = 5;
    }
    else if(this.auditor.arrayOfMonths[i] == "June"){
      this.aMonth = 6;
    }
    else if(this.auditor.arrayOfMonths[i] == "July"){
      this.aMonth = 7;
    }
    else if(this.auditor.arrayOfMonths[i] == "August"){
      this.aMonth = 8;
    }
    else if(this.auditor.arrayOfMonths[i] == "September"){
      this.aMonth = 9;
    }
    else if(this.auditor.arrayOfMonths[i] == "October"){
      this.aMonth = 10;
    }
    else if(this.auditor.arrayOfMonths[i] == "November"){
      this.aMonth = 11;
    }
    else if(this.auditor.arrayOfMonths[i] == "December"){
      this.aMonth = 12;
    }
    for(var i = 0; i < this.auditor.arrayOfDates.length; i++)
    {
      if((this.auditor.arrayOfDates[i].theDate.getMonth()+1) == this.aMonth){
	this.selectedDates.push(this.auditor.arrayOfDates[i]);
      }
    }
  }

  compileGraph(){
    var label = this.auditor.firstName + " " + this.auditor.lastName + "'s items audited (in thousands)";
    var aLabel = "";
    var aError = "";
    var errorLabel = this.auditor.firstName + " " + this.auditor.lastName + "'s errors found";
    var errorData = [];
    var data = [];
    var errorData = [];
    var backgroundColors = [];
    var errorBackgroundColors = [];
    var borderColors = [];
    var errorBorderColors = [];
    var labels = [];
    var route: Array<Route> = [];
    for(var i = 0; i < this.selectedDates.length; i++){
      var theDate = new aDate();
      theDate.convertJSON(this.selectedDates[i]);
      data.push((theDate.getNumberOfItemsAudited()/1000));
      errorData.push(theDate.errors.length); 
      backgroundColors.push("rgba(255, 99, 132, 0.2)");
      errorBackgroundColors.push("rgba(54, 162, 235, 0.2)");
      borderColors.push("rgba(255, 99, 132, 1)");
      errorBorderColors.push("rgba(54, 162, 235, 1)");
      aLabel = "" + (this.selectedDates[i].theDate.getMonth()+1) + "/" + this.selectedDates[i].theDate.getDate() + "/" + this.selectedDates[i].theDate.getFullYear();
      labels.push(aLabel);
    } 

    var navigationExtras: NavigationExtras = {
      queryParams: {
	"data": data,
	"errorData": errorData,
	"backgroundColors": backgroundColors,
	"errorBackgroundColors": errorBackgroundColors,
	"borderColors": borderColors, 
	"errorBorderColors": errorBorderColors,
	"labels": labels,
	"errorLabel": errorLabel,
	"label": label,
      }
    } 
    this.sessionService.currentDates = this.selectedDates;
    this.router.navigate(['/chart'], navigationExtras); 

  }

  delegateForLog(response){
    this.logs = response.log;
  }

  repair(){
    this.databaseService.repair().subscribe();
  }

  choice(data: number)
  {
    this.section = data;
  } 

}
