import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlanningApiService} from './shared/services/planning.api.service';
import {HeaderAction, UIActionsService} from './shared/services/ui.actions.service';
import {MdDialog} from '@angular/material';
import {PlanningResource} from './shared/models/planning-resource.model';
import {PlanningParams} from './shared/models/planning-params.model';
import {DateUtils} from './shared/utils/dateUtils';
import {Subscription} from 'rxjs/Subscription';
import {AddResourceComponent} from './app-new-resource.component';

// TODO : Mutualiser ce qui est mutualisable avec planning.component ???

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnDestroy {
  resources: PlanningResource[] = [];
  currentDate: Date = null;
  selectedResourcesIds = [];
  planningParams: PlanningParams = null;
  showAddButton: boolean = true;
  showModifyButton: boolean = false;
  showDeleteButton: boolean = false;

  HeaderSubscription: Subscription;
  DialogCreateSubscription: Subscription;
  DialogUpdateSubscription: Subscription;

  constructor(private planningService: PlanningApiService, private uiActionsService: UIActionsService,
              public dialog: MdDialog) {
    this.HeaderSubscription = uiActionsService.actionTriggered$.subscribe(
      action => {
        this.headerAction(action);
      }
    )

    this.DialogCreateSubscription = uiActionsService.dialogResourceActionCreateTriggered$.subscribe(
      resource => {
        this.dialogCreateAction(resource);
      }
    )

    this.DialogUpdateSubscription = uiActionsService.dialogResourceActionUpdateTriggered$.subscribe(
      resource => {
        this.dialogUpdateAction(resource);
      }
    )
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

  dialogCreateAction(createdResource: PlanningResource) {
    // Tâche non créée côté Back-end
    if (createdResource._id == null) {
      this.resources.push(createdResource);
    } else {
      const index = this.resources.indexOf(this.resources.find(resource => resource.name === createdResource.name && resource._id == null));
      this.resources[index] = createdResource;
    }
  }

  dialogUpdateAction(resource) {
    resource.selected = false;
    this.selectedResourcesIds.length = 0;
    this.updateButtonsStatus();
  }

  ngOnInit(): void {

    this.planningService.getResources()
      .then(resources => this.resources = resources);

    this.planningService.getPlanningParams()
      .then(planningParams => this.planningParams = planningParams)
      .then(() => this.currentDate = new Date(this.planningParams.currentDate))
    ;
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.HeaderSubscription.unsubscribe();
  }

  public openDialogCreate() {
    const dialogRef = this.dialog.open(AddResourceComponent);
  }

  public openDialogModify() {
    const index = this.resources.indexOf(this.resources.find(resource => resource._id === this.selectedResourcesIds[0]));
    const dialogRef = this.dialog.open(AddResourceComponent, {
      data: {
        selectedResource: this.resources[index]
      }
    });
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

  private resourceSelected(event, resourceId: number) {
    const index = this.selectedResourcesIds.indexOf(resourceId);
    if (index === -1) {
      this.selectedResourcesIds.push(resourceId);
    } else {
      this.selectedResourcesIds.splice(index, 1);
    }
    this.updateButtonsStatus();
  }

  private updateButtonsStatus() {
    this.showAddButton = this.selectedResourcesIds.length === 0;
    this.showModifyButton = this.selectedResourcesIds.length === 1;
    this.showDeleteButton = this.selectedResourcesIds.length >= 1;
  }

  private async deleteSelectedResourcesAsync() {
    // TODO : Gérer si la ressource supprimée est associée à des tâches...
    await this.deleteSelectedResources();
    this.selectedResourcesIds.length = 0;
    this.updateButtonsStatus();
  }

  private async deleteSelectedResources() {
    for (let i = 0; i < this.selectedResourcesIds.length; i++) {
      this.planningService.deletePlanningResource(this.selectedResourcesIds[i]).then(() => {
      })
        .catch((error) => console.log(error));

      const index = this.resources.indexOf(this.resources.find(resource => resource._id === this.selectedResourcesIds[i]));
      if (index !== -1) {
        this.resources.splice(index, 1);
      }
    }
  }

  private updateCurrentDate(newDate: Date) {
    this.currentDate = newDate;
  }

  private addDays(date: string, days: number): Date {
    return DateUtils.addDays(date, days);
  }

  private getWorkloadForDate(taskMap: any, date: string, days: number): string {
    return DateUtils.getWorkloadForDate(taskMap, date, days);
  }

  // endregion

}
