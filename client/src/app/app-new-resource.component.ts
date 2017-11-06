import {Component, Inject, OnInit} from '@angular/core';
import {PlanningApiService} from './shared/services/planning.api.service';
import {PlanningResource} from './shared/models/planning-resource.model';
import {UIActionsService} from './shared/services/ui.actions.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-example-dialog',
  templateUrl: './app-new-resource.component.html'
})
export class AddResourceComponent implements OnInit {
  resource: PlanningResource;
  resources: PlanningResource[] = [];
  isCreate: boolean;

  constructor(private planningService: PlanningApiService,
              private uiActionsService: UIActionsService,
              @Inject(MAT_DIALOG_DATA) private data: { selectedResource: PlanningResource },
              private matDialogRef: MatDialogRef<AddResourceComponent>) {
  }

  ngOnInit(): void {
    this.planningService.getResources()
      .then(resources => this.resources = resources);

    if (this.data === null) {
      this.resource = new PlanningResource();
      this.isCreate = true;
    } else {
      this.resource = this.data.selectedResource;
      this.isCreate = false;
    }
  }

  createResource(): void {
    this.planningService
      .createPlanningResource(this.resource)
      .then(resource => {
        this.uiActionsService.dialogResourceActionCreateTriggered(resource);
      })
    // .catch(error => this.error = error); // TODO: Display error message
    this.uiActionsService.dialogResourceActionCreateTriggered(this.resource);
    this.resource = new PlanningResource();
  }

  modifyResource(): void {
    // TODO - fonctionnel : Si update trigramme, doit updater en masse task trigram
    this.planningService
      .updatePlanningResource(this.resource)
      .then(task => {

      });
    this.uiActionsService.dialogResourceActionUpdateTriggered(this.resource);
    this.matDialogRef.close();
    // .catch(error => this.error = error); // TODO: Display error message
  }
}
