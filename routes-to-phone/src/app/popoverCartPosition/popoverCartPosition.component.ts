import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Auditor } from '../models/auditor';
import { Route } from '../models/route';
import { CartPosition } from '../models/cartPosition';

@Component({
  selector: 'popover-cartposition',
  templateUrl: './popoverCartPosition.component.html',
  styleUrls: ['./popoverCartPosition.component.css']
})

export class PopoverCartPositionComponent{
  @Input() selectedRoute: Route;
  @Output() selectedCartPosition = new EventEmitter<CartPosition>();
  constructor(){
    
  }

  ngOnChanges(){
    if(this.selectedRoute != null){
      console.log(this.selectedRoute);
    }
  } 

  cartPositionSelected(j: number, k: number, l: number){
    this.selectedCartPosition.emit(this.selectedRoute.statuss[j].stops[k].cartPositions[l]);
  }

}
