import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { aDate } from './models/date';

@Injectable()
export class SessionService{
  currentDates: Array<aDate> = [];
  constructor(){

  }
}
