import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'view',
  moduleId: module.id,
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent{
  routes: Array<any> = [];
  updatedRoutes: Array<number> = [];
  constructor(private dataService: DataService){
    this.dataService.getRoutes().subscribe(res => this.delegateForManifest(res));
  }

  delegateForManifest(manifest)
  {
    this.routes = manifest;
  }

  addStop(i: number, stop: any){
    if(this.checkRoute(i, stop) == true)
    {
      this.routes[i].hotStops.push(stop);
    }
    console.log(this.routes);
  }
  
  checkRoute(i: number, stop: any){
    for(var j = 0; j < this.routes[i].hotStops.length; j++)
    {
      if(this.routes[i].hotStops[j] == stop)
      {
        this.routes[i].hotStops.splice(j, 1);
        return false;
      }
    }
    return true;
  }

  saveChanges(){
    var theArguments: Array<any> = [];
    for(var i = 0; i < this.routes.length; i++)
    {
      theArguments.push(this.dataService.updateRoute(this.routes[i]));
    }    
    forkJoin(theArguments).subscribe();
  }
}
