import { Auditor } from './auditor';
import { Route } from './route';
import { Error } from './error';

export class aDate{
  theDate: Date;
  routes: Array<Route>;
  errors: Array<Error>;

  constructor(){
    this.theDate = new Date();
    this.routes = [];
    this.errors = [];
  }

  convertJSON(anDate: any){
    console.log(anDate.theDate);
    this.theDate = new Date(anDate.theDate);
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
  
  isMonth(enteredMonth: number){
    console.log("the month on file is " + this.theDate.getMonth());
    if(this.theDate.getMonth() == enteredMonth){
      return true;
    }
    return false;
  }

  getNumberOfItemsAudited(){
    var itemsAudited = 0;
    for(var i = 0; i < this.routes.length; i++){
      itemsAudited = itemsAudited + this.routes[i].getNumberOfItemsAudited();
    } 
    return itemsAudited;
  }
  
}
