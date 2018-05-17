export class Item{
  itemName: string;
  wrin: string;
  quantity: string;
  stopNumber: string;
  type: string;
  cartPosition: string;

  constructor(){
    this.itemName = "";
    this.wrin = "";
    this.quantity = "";
    this.stopNumber = "";
    this.type = "";
    this.cartPosition = "";
  }

  convertJSON(anItem: any){
    this.itemName = anItem.itemName;
    this.wrin = anItem.wrin;
    this.quantity = anItem.quantity;
    this.stopNumber = anItem.stopNumber;
    this.type = anItem.type;
    this.cartPosition = anItem.cartPosition;
  }
}
