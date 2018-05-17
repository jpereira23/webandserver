import { Item } from './item';

export class Error{
  typeOfError: Array<string>;
  errorIndex: number;
  picked: Item;
  correct: Item;
  wrongCartPosition: string;
  short: number;
  overage: number;
  itemOverage: Item;
  itemShort: Item;
  routeNumber: string;
  cartPosition: string;
  picker: string;
  message: string; 
  constructor(){
    this.typeOfError = ["Missing Cart Handle", "Damaged Cart Wheel", "Mis-Picks", "Wrap Issue", "Bun Error", "Shorts", "Wrong Cart", "Overages"];
    this.errorIndex = 0;
    this.picked = new Item();
    this.correct = new Item();
    this.wrongCartPosition = "";
    this.short = 0;
    this.overage = 0;
    this.itemOverage = new Item();
    this.itemShort = new Item();
    this.routeNumber = "";
    this.cartPosition = "";
    this.picker = "";
    this.message = "";
  }

  convertJSON(anError: any){
    this.errorIndex = anError.errorIndex;
    var anPickedItem = new Item();
    anPickedItem.convertJSON(anError.picked);
    this.picked = anPickedItem;
    var anCorrectItem = new Item();
    anCorrectItem.convertJSON(anError.correct);
    this.correct = anCorrectItem;
    this.wrongCartPosition = anError.wrongCartPosition;
    this.short = anError.short;
    this.overage = anError.overage;
    var anItemOverage = new Item();
    anItemOverage.convertJSON(anError.itemOverage);
    this.itemOverage = anItemOverage;
    var anItemShort = new Item();
    anItemShort.convertJSON(anError.itemShort);
    this.itemShort = anItemShort;
    this.routeNumber = anError.routeNumber;
    this.cartPosition = anError.cartPosition;
    this.picker = anError.picker;
    this.message = anError.message;
  }
}
