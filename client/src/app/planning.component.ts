import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlanningApiService} from './shared/services/planning.api.service';
import {PlanningResource} from './shared/models/planning-resource.model';
import {PlanningTask} from './shared/models/planning-task.model';
import {PlanningParams} from './shared/models/planning-params.model';
import {MatDialog} from '@angular/material'; // TODO : A supprimer ?
import {AddTaskComponent} from './app-new-task.component';
import {HeaderAction, UIActionsService} from './shared/services/ui.actions.service';
import {Subscription} from 'rxjs/Subscription';
import {DragulaService} from 'ng2-dragula';
import {DateUtils} from "./shared/utils/dateUtils";

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
  showDoneButton: boolean = false;

  HeaderSubscription: Subscription;
  DialogCreateSubscription: Subscription;
  DialogUpdateSubscription: Subscription;

  constructor(private planningService: PlanningApiService, private uiActionsService: UIActionsService,
              private dragulaService: DragulaService, public dialog: MatDialog) {
    this.HeaderSubscription = uiActionsService.actionTriggered$.subscribe(
      action => {
        this.headerAction(action);
      }
    )

    this.DialogCreateSubscription = uiActionsService.dialogTaskActionCreateTriggered$.subscribe(
      task => {
        this.dialogCreateAction(task);
      }
    )

    this.DialogUpdateSubscription = uiActionsService.dialogTaskActionUpdateTriggered$.subscribe(
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
    } else if (action === HeaderAction.MoveToNextWeek) {
      this.moveToNextWeek();
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
    this.updateButtonsStatus(false);
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
        selectedTask: this.tasks[index]
      }
    });
  }

  public moveToNextWeek() {
    this.updateButtonsStatus(true);
  }

  public doneNextWeek() {
    this.updateButtonsStatus(false);
    this.currentDate = this.addDays(this.currentDate.toJSON(), 7);

    this.planningParams.currentDate = this.currentDate;
    this.planningService.updatePlanningParams(this.planningParams);

    // Create informations for bulk update of etc
    const tab = this.tasks.map(task => {
      return {key: task._id, valEtc: task.etc};
    })

    // TODO : récupérer id / resource de la tache modifée pour n'updater qu'une partie du planning
    this.planningService.updateTasksBulk(tab);

    // Appel API pour MAJ ETC / tâche (cf. ce qui est déjà fait pour update en masse)
    // Appel API pour MAJ paramplanning
    // TODO : Stockage planning avant
    // Affiche production de la semaine

  }

  public cancelNextWeek() {
    this.updateButtonsStatus(false);
    // TODO : Si RAE modifiés, refresh avec valeurs serveur
  }

  // endregion

  // region Events
  private onDrop() {
    // Create informations for bulk update of positions
    const tab = this.tasks.map((task, index) => {
      return {key: task._id, valPos: index + 1};
    })

    // TODO : récupérer id / resource de la tache modifée pour n'updater qu'une partie du planning
    this.planningService.updateTasksBulk(tab);
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

  private taskSelected(event, taskId: number) {
    if (!this.showDoneButton) {
      const index = this.selectedTasksIds.indexOf(taskId);
      if (index === -1) {
        this.selectedTasksIds.push(taskId);
      } else {
        this.selectedTasksIds.splice(index, 1);
      }
      this.updateButtonsStatus(false);
    }
  }

  private updateButtonsStatus(isNextWeekAction: boolean) {
    if (isNextWeekAction) {
      this.showDoneButton = true;
      this.showAddButton = false;
      this.showModifyButton = false;
      this.showDeleteButton = false;
    } else {
      this.showDoneButton = false;
      this.showAddButton = this.selectedTasksIds.length === 0;
      this.showModifyButton = this.selectedTasksIds.length === 1;
      this.showDeleteButton = this.selectedTasksIds.length >= 1;
    }
  }

  private async deleteSelectedTasksAsync() {
    await this.deleteSelectedTasks();
    this.selectedTasksIds.length = 0;
    this.updateButtonsStatus(false);
  }

  private updateCurrentDate(newDate: Date) {
    this.currentDate = newDate;
  }

  private addDays(date: string, days: number): Date {
    return DateUtils.addDays(date, days);
  }

  private getWorkloadForDate(task: PlanningTask, date: string, days: number): string {
    if (task.isMilestone) {
//      console.log('task.milestoneDate : ' + task.milestoneDate);
//      console.log('this.addDays(date, days) : ' + this.addDays(date, days).toJSON());
      if (task.isMilestone && task.milestoneDate === this.addDays(date, days)) {
        return 'X';
      }
    }
    return DateUtils.getWorkloadForDate(task.daysMap, date, days);
  }

  // endregion
}
