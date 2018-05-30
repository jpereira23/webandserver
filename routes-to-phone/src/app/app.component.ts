import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  archiveSelected: boolean = false;
  auditSelected: boolean = true;
  constructor(private router: Router){
    
  }

  navigateAuditing(){
    this.router.navigate(['']);    
    this.auditSelected = true;
    this.archiveSelected = false;
  }

  navigateArchives(){
    this.router.navigate(['/archives']);
    this.auditSelected = false;
    this.archiveSelected = true;
  }
}
