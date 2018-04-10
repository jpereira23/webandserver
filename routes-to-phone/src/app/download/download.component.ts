import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'download',
  moduleId: module.id,
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})

export class DownloadComponent{
  
  constructor(private dataService: DataService){
    
  }

  saveFile(){
    this.dataService.getApp().subscribe();
  } 
}
