import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlanningApiService} from './shared/services/planning.api.service';
import {PlanningResource} from './shared/models/planning-resource.model';
import {PlanningTask} from './shared/models/planning-task.model';
import {PlanningParams} from './shared/models/planning-params.model';
import {MdDialog} from '@angular/material'; // TODO : A supprimer ?
import {AddTaskComponent} from './app-new-task.component';
import {HeaderAction, UIActionsService} from './shared/services/ui.actions.service';
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
  selectedTasksIds = [];
  showAddButton: boolean = true;
  showModifyButton: boolean = false;
  showDeleteButton: boolean = false;

  HeaderSubscription: Subscription;
  DialogCreateSubscription: Subscription;
  DialogUpdateSubscription: Subscription;

  constructor(private planningService: PlanningApiService, private uiActionsService: UIActionsService,
              private dragulaService: DragulaService, public dialog: MdDialog) {
    this.HeaderSubscription = uiActionsService.actionTriggered$.subscribe(
      action => {
        this.headerAction(action);
      }
    )

    this.DialogCreateSubscription = uiActionsService.dialogActionCreateTriggered$.subscribe(
      task => {
        this.dialogCreateAction(task);
      }
    )

    this.DialogUpdateSubscription = uiActionsService.dialogActionUpdateTriggered$.subscribe(
      task => {
        this.dialogUpdateAction(task);
      }
    )

    // Subscribe to drag & drop events
    dragulaService.drop.subscribe((value) => {
      this.onDrop();
    });
  }

  headerAction(action) {
    if (action === HeaderAction.Previous) {
      this.updateCurrentDateMinus4weeks();
    } else if (action === HeaderAction.Next) {
      this.updateCurrentDateAdd4weeks();
    } else if (action === HeaderAction.Today) {
      this.resetCurrentDate();
    }
  }

  dialogCreateAction(createdTask: PlanningTask) {
    // Tâche non créée côté Back-end
    if (createdTask._id == null) {
      this.tasks.push(createdTask);
    } else {
      const index = this.tasks.indexOf(this.tasks.find(task => task.name === createdTask.name && task._id == null));
      this.tasks[index] = createdTask;
    }
  }

  dialogUpdateAction(task) {
    task.selected = false;
    this.selectedTasksIds.length = 0;
    this.updateButtonsStatus();
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
    this.HeaderSubscription.unsubscribe();
  }

  // endregion

  public openDialogCreate() {
    const dialogRef = this.dialog.open(AddTaskComponent);
  }

  public openDialogModify() {
    const index = this.tasks.indexOf(this.tasks.find(task => task._id === this.selectedTasksIds[0]));
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: {
        selectedTask: this.tasks[index] // TODO : Envoyer la bonne tâche
      }
    });
  }

  // region Events
  private onDrop() {
    // Create informations for bulk update of positions
    const tab = this.tasks.map((task, index) => {
      return {key: task._id, val: index + 1};
    })

    // TODO : récupérer id / resource de la tache modifée pour n'updater qu'une partie du planning
    this.planningService.updateTasksBulk(tab);
  }

  private taskSelected(event, taskId: number) {
    const index = this.selectedTasksIds.indexOf(taskId);
    if (index === -1) {
      this.selectedTasksIds.push(taskId);
    } else {
      this.selectedTasksIds.splice(index, 1);
    }
    this.updateButtonsStatus();
  }

  private updateButtonsStatus() {
    this.showAddButton = this.selectedTasksIds.length === 0;
    this.showModifyButton = this.selectedTasksIds.length === 1;
    this.showDeleteButton = this.selectedTasksIds.length >= 1;
  }

  // endregion

  private async deleteSelectedTasksAsync() {
    await this.deleteSelectedTasks();
    this.selectedTasksIds.length = 0;
    this.updateButtonsStatus();
  }

  private async deleteSelectedTasks() {
    for (let i = 0; i < this.selectedTasksIds.length; i++) {
      this.planningService.deletePlanningTask(this.selectedTasksIds[i]).then(() => {
      })
        .catch((error) => console.log(error));

      const index = this.tasks.indexOf(this.tasks.find(task => task._id === this.selectedTasksIds[i]));
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    }
  }

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

    if (taskMap != null) {
      // TODO : Pas optimisé, ne pas faire à chaque fois, devrait être fait à la création de l'objet
      let taskDays: Map<string, number>;
      taskDays = new Map(taskMap.map((i) => [i.key, parseFloat(i.val)]));

      if (taskDays.has(tmpDate)) {
        return taskDays.get(tmpDate).toString();

      }
      return '';
    }

// endregion
  }
}
