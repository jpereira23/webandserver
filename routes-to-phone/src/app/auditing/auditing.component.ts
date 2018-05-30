import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'auditing',
  moduleId: module.id,
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.css']
})

export class AuditingComponent{
  manifestSelected: boolean = true;
  downloadSelected: boolean = false;
  constructor(private router: Router){

  }

  viewUpload(){
    this.router.navigate(['/auditing/']);
    this.manifestSelected = true;
    this.downloadSelected = false;
  }

  viewDownload(){
    this.router.navigate(['/auditing/download']);
    this.manifestSelected = false;
    this.downloadSelected = true;
  }
}
