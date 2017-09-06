import {Component, OnInit} from '@angular/core';
import {PlanningService} from './shared/services/planning.service';
import {PlanningProject} from './shared/models/planning-project.model';
import {PlanningResource} from './shared/models/planning-resource.model';
import {PlanningTask} from './shared/models/planning-task.model';
import {PlanningParams} from './shared/models/planning-params.model';
import {MdDialog} from '@angular/material'; // TODO : A supprimer ?
import {AddTaskComponent} from './app-new-task.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class ScheduleComponent implements OnInit {
  projects: PlanningProject[] = [];
  resources: PlanningResource[] = [];
  tasks: PlanningTask[] = [];
  planningParams: PlanningParams = null;

  constructor(private planningService: PlanningService, public dialog: MdDialog) {
  }

  ngOnInit(): void {
    this.planningService.getProjects()
      .then(projects => this.projects = projects);

    this.planningService.getResources()
      .then(resources => this.resources = resources);

    this.planningService.getPlanningTasks()
      .then(tasks => this.tasks = tasks);

    this.planningService.getPlanningParams()
      .then(planningParams => this.planningParams = planningParams);
  }

  addDays(date: string, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  getWorkloadForDate(taskMap: any, date: string, days: number): string {
    const tmpDate: string = JSON.parse(JSON.stringify(this.addDays(date, days)));
    let taskDays: Map<string, number>;
    taskDays = new Map(taskMap.map((i) => [i.key, parseFloat(i.val)]));

    if (taskDays.has(tmpDate)) {
      return taskDays.get(tmpDate).toString();
    } else {
      return '';
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      /* height: '400px',
      width: '600px' */
    });
  }
}
