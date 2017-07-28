import {Component, OnInit} from '@angular/core';
import {PlanningService} from './shared/services/planning.service';
import {PlanningProject} from './shared/models/planning-project.model';
import {PlanningResource} from './shared/models/planning-resource.model';
import {PlanningTask} from './shared/models/planning-task.model';
import {PlanningParams} from './shared/models/planning-params.model';

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

  constructor(private planningService: PlanningService) {
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

  addDays(date: Date, days: number): Date {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  getWorkloadForDate(taskMap: any, date: Date, days: number): number {
    let tmpDate = this.addDays(date, days);

    if (taskMap.has(tmpDate)) {
      return taskMap.get(tmpDate);
    } else {
      return 0;
    }
  }
}
