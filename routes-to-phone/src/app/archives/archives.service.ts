import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Auditor } from '../models/auditor';

@Injectable()
export class ArchivesService{
  private selectedAuditor: Auditor;
  private selectedDate: Date;

  constructor(){

  }

  setDelivarables(anAuditor: Auditor, anDate: Date){
    this.selectedAuditor = anAuditor;
    this.selectedDate = anDate;
  }

  getAuditor(){
    return this.selectedAuditor;
  }

  getDate(){
    return this.selectedDate;
  }
}
