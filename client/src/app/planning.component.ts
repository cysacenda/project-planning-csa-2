import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlanningService} from './shared/services/planning.service';
import {PlanningResource} from './shared/models/planning-resource.model';
import {PlanningTask} from './shared/models/planning-task.model';
import {PlanningParams} from './shared/models/planning-params.model';
import {MdDialog} from '@angular/material'; // TODO : A supprimer ?
import {AddTaskComponent} from './app-new-task.component';
import {HeaderService, HeaderServiceAction} from './shared/services/header.service';
import {Subscription} from 'rxjs/Subscription';
import {DragulaService} from 'ng2-dragula';

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

  constructor(private planningService: PlanningService, private headerService: HeaderService,
              private dragulaService: DragulaService, public dialog: MdDialog) {
    this.subscription = headerService.actionTriggered$.subscribe(
      action => {
        if (action === HeaderServiceAction.Previous) {
          this.updateCurrentDateMinus4weeks();
        } else if (action === HeaderServiceAction.Next) {
          this.updateCurrentDateAdd4weeks();
        } else if (action === HeaderServiceAction.Today) {
          this.resetCurrentDate();
        }
      }
    )

    // Subscribe to drag & drop events
    dragulaService.drop.subscribe((value) => {
      this.onDrop();
    });
  }

  public openDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      /* height: '400px',
      width: '600px' */
    });
  }

  // region Init / Destroy component
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

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  // endregion

  // region Dates
  public updateCurrentDateAdd4weeks() {
    this.updateCurrentDate(this.addDays(this.currentDate.toJSON(), 28));
  }

  public updateCurrentDateMinus4weeks() {
    this.updateCurrentDate(this.addDays(this.currentDate.toJSON(), -28));
  }

  public resetCurrentDate() {
    this.updateCurrentDate(new Date(this.planningParams.currentDate));
  }

  private onDrop() {
    // Create informations for bulk update of positions
    const tab = this.tasks.map((task, index) => {
      return {key: task._id, val: index + 1};
    })

    // TODO : récupérer id / resource de la tache modifée pour n'updater qu'une partie du planning
    this.planningService.updateTasksBulk(tab);
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

// endregion
}
