import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { saveAs } from 'file-saver/FileSaver';

@Injectable()
export class DataService{
//url: string = "http://172.20.10.3:3000/api";
url: string = "http://localhost:3000/api";
  headers = new Headers();
  result: any; 
  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/json');
  }

  generateManifest(filename){
    var aFile = {
      name: filename
    }
    return this._http.post(this.url + '/compileManifest', JSON.stringify(aFile), { headers: this.headers}).map(res => res.json());
  }

  getRoutes(){
    return this._http.get(this.url + '/obtainManifest').map(result => this.result = result.json().data);
  }

  updateRoute(route){
    return this._http.post(this.url + '/updateForHotRoute', JSON.stringify(route), { headers: this.headers}).map(res => res.json());
  }

  getApp(){
  //return this._http.get('http://172.20.10.3:3000/download').map(result => this.saveToFileSystem(result));
  return this._http.get('http://localhost:3000/download').map(result => this.saveToFileSystem(result));
  }

  saveToFileSystem(response){
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response.body], { type: 'text/plain' });
    saveAs(blob, filename);
  }
}
