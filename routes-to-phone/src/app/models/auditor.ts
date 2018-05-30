import { aDate } from './date';
export class Auditor{
  firstName: string;
  lastName: string;
  arrayOfDates: Array<aDate>;

  constructor(){
    this.firstName = "";
    this.lastName = "";
    this.arrayOfDates = [];
  }

  convertJSON(anAuditor: any){
    this.firstName = anAuditor.firstName;
    this.lastName = anAuditor.lastName;
    for(var i = 0; i < anAuditor.dates.length; i++){
      var anDate = new aDate();
      anDate.convertJSON(anAuditor.dates[i]);
      this.arrayOfDates.push(anDate);
    } 
  }
}


