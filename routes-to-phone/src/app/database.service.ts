import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DatabaseService{
  url: string = "http://172.124.232.210:443/dataB";
  headers = new Headers();
  result: any;
  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/json');
  }

  getStorageDetails(){
    return this._http.get(this.url + '/storageDetails').map(result => this.result = result.json().object);
  } 

  getLog(){
    return this._http.get(this.url + '/log').map(result => this.result = result.json().data);
  }

  repair(){
    var request = null;
    return this._http.post(this.url + '/repair', JSON.stringify(request), { headers: this.headers }).map(res => res.json());
  }
}
