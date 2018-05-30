import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'popover-date',
  moduleId: module.id,
  templateUrl: './popoverDate.component.html',
  styleUrls: ['./popoverDate.component.css']
})

export class PopoverDateComponent{
  @Output() selectedDate = new EventEmitter<Date>();
  arrayOfMonths: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  arrayOfDates: Array<Date> = [];
  filler: Array<string> = [];
  daysOfWeek: Array<string> = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  currentMonth: string;
  theIndex: number = 0;
  zeBounds: number = 0;
  aFiller: string = "  ";
  constructor(){
    this.currentMonth = this.arrayOfMonths[0];
    this.generateDates();
  }

  dateSelected(i: number){
    this.selectedDate.emit(this.arrayOfDates[i]);
  }

  clickRight(){
    if(this.theIndex < this.arrayOfMonths.length){
      this.theIndex++;
      this.currentMonth = this.arrayOfMonths[this.theIndex];
    } 
    this.generateDates();
  }

  clickLeft(){
    if(this.theIndex >= 0){
      this.theIndex--;
      this.currentMonth = this.arrayOfMonths[this.theIndex];
    }
    this.generateDates();
  }

  generateDates(){
    this.arrayOfDates = [];
    this.fillArray();
    var counter = 1;
    var aDate = new Date();
    aDate.setMonth(0);
    for(var i = 1; i < 32; i++){
     aDate = new Date();
     aDate.setMonth(this.theIndex);
     aDate.setDate(i);
     if(aDate.getMonth() == this.theIndex){
      this.arrayOfDates.push(aDate);
     }
    }

    console.log(this.arrayOfDates);

  }

  fillArray(){
    var aDate = new Date();
    aDate.setDate(1);
    aDate.setMonth(this.theIndex);
    this.zeBounds = aDate.getDay();
    console.log(this.zeBounds);
    for(var i = aDate.getDay(); i > 0; i--)
    {
      var newDate = new Date();
      newDate.setDate(30 - i);
      newDate.setMonth(this.theIndex);
      this.arrayOfDates.push(newDate);
    }
  }

}
