import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
//import * as Chart from 'chart.js'
import { Chart } from 'chart.js';

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
  section: number = 1;
  months: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  dates: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  selectedMonth: string = "Jan";
  chartWeek1 = [];
  chartWeek2 = [];
  chartWeek3 = [];

  constructor(private databaseService: DatabaseService){
    this.databaseService.getStorageDetails().subscribe(res => this.delegateForStorage(res)); 
    this.databaseService.getLog().subscribe(res => this.delegateForLog(res));
    /*
    
    */

  }

  ngOnInit(){
 

  }

  delegateForStorage(response){
    console.log(response);
    this.used = Math.round(response.fsUsedSize * 100) / 100;
    this.capacity = Math.round(response.fsTotalSize * 100) / 100;
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
