import { Status } from './status';

export class Route{
  routeNumber: string;
  statuss: Array<Status>;

  constructor(){
    this.routeNumber = "";
    this.statuss = [];
  }

  convertJSON(anRoute: any){
    this.routeNumber = anRoute.routeNumber;
    for(var i = 0; i < anRoute.statuss.length; i++)
    {
      var anStatus = new Status();
      anStatus.convertJSON(anRoute.statuss[i]);
      this.statuss.push(anStatus);
    }
  }

  getNumberOfItemsAudited(){
    var count = 0; 
    for(var i = 0; i < this.statuss.length; i++)
    {
      count = count + this.statuss[i].getNumberOfItemsAudited();
    }
    return count;
  }
}

