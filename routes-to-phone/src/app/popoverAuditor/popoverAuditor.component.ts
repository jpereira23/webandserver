import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Auditor } from '../models/auditor';

@Component({
  selector: 'popover-auditor',
  moduleId: module.id,
  templateUrl: './popoverAuditor.component.html',
  styleUrls: ['./popoverAuditor.component.css']
})

export class PopoverAuditorComponent{
  @Input() arrayOfAuditors: Array<Auditor> = [];
  @Output() selectedAuditor = new EventEmitter<Auditor>();
  constructor(){

  }

  auditorSelected(i: number){
    this.selectedAuditor.emit(this.arrayOfAuditors[i]);
  }
}
