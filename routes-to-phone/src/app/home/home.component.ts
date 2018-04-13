import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { DataService } from '../data.service';

import * as io from "socket.io-client";



//const URL = 'http://172.20.10.3:3000/getupload';
const URL = 'http://localhost:3000/getupload';

@Component({
  selector: 'home',
  moduleId: module.id,
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css']
})

export class HomeComponent{
  uploader: FileUploader = new FileUploader({url: URL});
  currentFile: string = "";
  aURL = 'http://172.20.10.3:3000';
  constructor(private dataService: DataService){
  }

  stuff(item)
  {
    console.log(item);
  }
  uploading(event: any)
  {
    this.currentFile = './pdfs/' + event.target.files[0].name; 
  }

  uploadRequest(item: any)
  {
    item.upload();
    this.uploader.onCompleteItem = (item: any, response: any, status:any, headers: any) => {
    this.dataService.generateManifest('./pdfs/' + item.file.name).subscribe();
    };
  }

  callBack()
  {
    console.log("Make it work"); 
  }
}
