import { Auditor } from './auditor';
import { Route } from './route';
import { Error } from './error';

export class aDate{
  date: string;
  theDate: Date;
  routes: Array<Route>;
  errors: Array<Error>;

  constructor(){
    this.date = "";
    this.theDate = new Date();
    this.routes = [];
    this.errors = [];
  }

  convertJSON(anDate: any){
    this.date = anDate.date;
    this.theDate = anDate.theDate;
    for(var i = 0; i < anDate.routes.length; i++)
    {
      var anRoute = new Route();
      anRoute.convertJSON(anDate.routes[i]);
      this.routes.push(anRoute);
    }

    for(var j = 0; j < anDate.errors.length; j++)
    {
      var anError = new Error();
      anError.convertJSON(anDate.errors[j]);
      this.errors.push(anError);
    }
  }

  getNumberOfItemsAudited(){
    var count = 0;
    for(var i = 0; i < this.routes.length; i++){
      count = count + this.routes[i].getNumberOfItemsAudited();
    }
    return count;
  } 
}
