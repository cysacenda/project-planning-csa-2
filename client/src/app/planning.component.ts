import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlanningService} from './shared/services/planning.service';
import {PlanningResource} from './shared/models/planning-resource.model';
import {PlanningTask} from './shared/models/planning-task.model';
import {PlanningParams} from './shared/models/planning-params.model';
import {MdDialog} from '@angular/material'; // TODO : A supprimer ?
import {AddTaskComponent} from './app-new-task.component';
import {HeaderService} from './shared/services/header.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-schedule',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  projects: String[] = [];
  resources: PlanningResource[] = [];
  tasks: PlanningTask[] = [];
  planningParams: PlanningParams = null;
  currentDate: Date = null;

  subscription: Subscription;

  constructor(private planningService: PlanningService, private headerService: HeaderService, public dialog: MdDialog) {
    this.subscription = headerService.missionAnnounced$.subscribe(
      () => {
        this.updateCurrentDateAdd3weeks();
      }
    )
  }

  ngOnInit(): void {
    this.planningService.getProjects()
      .then(projects => this.projects = projects);

    this.planningService.getResources()
      .then(resources => this.resources = resources);

    this.planningService.getPlanningTasks()
      .then(tasks => this.tasks = tasks);

    this.planningService.getPlanningParams()
      .then(planningParams => this.planningParams = planningParams)
      .then(() => this.currentDate = new Date(this.planningParams.currentDate))
    ;
  }

  public updateCurrentDateAdd3weeks() {
    this.updateCurrentDate(this.addDays(this.currentDate.toJSON(), 21));
  }

  public updateCurrentDateMinus3weeks() {
    this.updateCurrentDate(this.addDays(this.currentDate.toJSON(), -21));
  }

  public openDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      /* height: '400px',
      width: '600px' */
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  private updateCurrentDate(newDate: Date) {
    this.currentDate = newDate;
  }

  private addDays(date: string, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  private getWorkloadForDate(taskMap: any, date: string, days: number): string {
    const tmpDate: string = this.addDays(date, days).toJSON();

    // TODO : Pas optimisé, ne pas faire à chaque fois, devrait être fait à la création de l'objet
    let taskDays: Map<string, number>;
    taskDays = new Map(taskMap.map((i) => [i.key, parseFloat(i.val)]));

    if (taskDays.has(tmpDate)) {
      return taskDays.get(tmpDate).toString();
    } else {
      return '';
    }
  }
}
