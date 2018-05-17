import { Stop } from './stop';

export class Status{
  auditorFirstName: string;
  auditorLastName: string;
  statusName: string;
  stops: Array<Stop>; 

  constructor(){
    this.auditorFirstName = "";
    this.auditorLastName = "";
    this.statusName = "";
    this.stops = [];
  }

  convertJSON(anStatus){
    this.auditorFirstName = anStatus.auditorFirstName;
    this.auditorLastName = anStatus.auditorLastName;
    this.statusName = anStatus.status;
    for(var i = 0; i < anStatus.stops.length; i++)
    {
      var aStop = new Stop();
      aStop.convertJSON(anStatus.stops[i]);
      this.stops.push(aStop);
    }
  }

  getNumberOfItemsAudited(){
    var count = 0; 
    for(var i = 0; i < this.stops.length; i++)
    {
      count = count + this.stops[i].getNumberOfItemsAudited();
    }
    return count;
  }

}
