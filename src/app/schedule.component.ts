import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {

  possiblePositions = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'}
  ];

  possibleResources = [
    {value: '1', viewValue: 'Cyril S.'},
    {value: '2', viewValue: 'Mohamed B.'},
    {value: '3', viewValue: 'Rudy J.'}
  ];

  possibleProjects = [
    {value: '1', viewValue: 'DC Mobile'},
    {value: '2', viewValue: 'P&F'},
    {value: '3', viewValue: 'DC AE'}
  ];
}
