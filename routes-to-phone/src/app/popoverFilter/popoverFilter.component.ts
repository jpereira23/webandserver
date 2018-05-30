import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Auditor } from '../models/auditor';

@Component({
  selector: 'popover-filter',
  moduleId: module.id,
  templateUrl: './popoverFilter.component.html',
  styleUrls: ['./popoverFilter.component.css']
})  

export class PopoverFilterComponent{

  @Input() arrayOfAuditors: Array<Auditor> = [];
  @Output() selectedAuditor = new EventEmitter<Auditor>() ;
  @Output() selectedMonth = new EventEmitter<number>();
  months: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  currentMonth = this.months[0];
  index: number = 0;
  constructor(){

  }

  clickRight(){
    if(this.index < this.months.length){
      this.index++;
      this.currentMonth = this.months[this.index];
    }
  }

  getGraph(i: number){
    this.selectedAuditor.emit(this.arrayOfAuditors[i]);
    this.selectedMonth.emit(this.index); 
  } 

  clickLeft(){
    if(this.index >= 0){
      this.index--;
      this.currentMonth = this.months[this.index];
    }
  }
}
