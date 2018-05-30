import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auditor } from '../models/auditor';


@Component({
  selector: 'archives',
  moduleId: module.id,
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})

export class ArchivesComponent{
  arrayOfAuditors: Array<Auditor> = [];
  graphSelected: boolean = true;
  manifestSelected: boolean = false;
  
  constructor(private router: Router){
        
  }


  viewGraph(){
    this.router.navigate(['/archives/']);
    this.graphSelected = true;
    this.manifestSelected = false;
  }

  viewManifest(){
    this.router.navigate(['/archives/manifest']);
    this.graphSelected = false;
    this.manifestSelected = true;
  }

  viewEndOfShift(){

  }
}
