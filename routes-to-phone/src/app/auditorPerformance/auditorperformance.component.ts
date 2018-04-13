import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'auditor',
  moduleId: module.id,
  templateUrl: './auditorperformance.component.html',
  styleUrls: ['./auditorperformance.component.css']
})

export class AuditorPerformanceComponent {
  used: number;
  capacity: number;
  logs: Array<string> = [];
  months: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  chartWeek1 = [];

  constructor(){

  }

  ngOnInit(){
    this.chartWeek1 = new Chart('canvas1', {
    type: 'bar',
    data: {
    labels: ["03/05 Routes", "03/05 Stops", "03/05 Errors", "03/07 Routes", "03/07 Stops", "03/08 Routes", "03/08 Stops", "03/10 Routes", "03/10 Stops", "03/11 Routes", "03/12 Routes", "03/12 Stops", "03/13 Routes", "03/13 Stops", "03/16 Routes", "03/16 Stops", "03/19 Routes", "03/19 Stops", "03/21 Routes", "03/21 Stops", "03/24 Routes", "03/24 Stops", "03/26 Routes", "03/26 Stops", "03/29 Routes", "03/31 Routes", "03/31 Stops"],
        datasets: [{
	label: 'Jeffery Pereira Auditor Performance for March 2018',
            data: [10, 18, 2, 10, 15, 20, 29, 17, 7, 14, 33, 22, 22, 19, 32, 46, 28, 28, 19, 24, 22, 31, 10, 25, 19, 6, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
		'rgba(255, 206, 86, 0.2)',
                'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
		'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)',
		'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
		'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)',
		'rgba(255, 206, 86, 1)',
                'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
                'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)',
		'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)',
		'rgba(255,99,132,1)',
                'rgba(255,99,132,1)',
		'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
}); 
  }
}
