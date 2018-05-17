import { Item } from './item';

export class CartPosition{
  pickerName: string;
  items: Array<Item>;
  cartPosition: string;

  constructor(){
    this.pickerName = "";
    this.items = [];
    this.cartPosition = "";
  }

  convertJSON(anCartPosition: any){
    this.pickerName = anCartPosition.pickerName;
    this.cartPosition = anCartPosition.cartPositionName;
    for(var i = 0; i < anCartPosition.items.length; i++){
      var anItem = new Item();
      anItem.convertJSON(anCartPosition.items[i]);
      this.items.push(anItem);
    }
  }

  getNumberOfItemsAudited(){
    return this.items.length;
  }
}
