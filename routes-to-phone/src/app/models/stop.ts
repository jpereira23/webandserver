import { CartPosition } from './cartPosition';

export class Stop{
  cartPositions: Array<CartPosition>;
  stopNumber: string;

  constructor(){
    this.cartPositions = [];
    this.stopNumber = "";
  }

  convertJSON(anStop: any){
    this.stopNumber = anStop.stopNumber;
    for(var i = 0; i < anStop.cartPositions.length; i++){
      var aCartPosition = new CartPosition();
      aCartPosition.convertJSON(anStop.cartPositions[i]);
      if(aCartPosition.audited == true){
	this.cartPositions.push(aCartPosition);
      }
    }
  }

  getNumberOfItemsAudited(){
    var count = 0;
    for(var i = 0; i < this.cartPositions.length; i++)
    {
      count = count + this.cartPositions[i].getNumberOfItemsAudited();
    }

    return count;
  }
}
