import {Component, Inject, OnInit} from '@angular/core';
import {PlanningApiService} from './shared/services/planning.api.service';
import {PlanningResource} from './shared/models/planning-resource.model';
import {PlanningTask} from './shared/models/planning-task.model';
import {UIActionsService} from './shared/services/ui.actions.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-example-dialog',
  templateUrl: './app-new-task.component.html'
})
export class AddTaskComponent implements OnInit {
  task: PlanningTask;

  projects: String[] = [];
  resources: PlanningResource[] = [];

  isCreate: boolean;

  constructor(private planningService: PlanningApiService,
              private uiActionsService: UIActionsService,
              @Inject(MAT_DIALOG_DATA) private data: { selectedTask: PlanningTask },
              private matDialogRef: MatDialogRef<AddTaskComponent>) {
  }

  ngOnInit(): void {
    this.planningService.getProjects()
      .then(projects => this.projects = projects);

    this.planningService.getResources()
      .then(resources => this.resources = resources);

    if (this.data === null) {
      this.task = new PlanningTask();
      this.isCreate = true;
    } else {
      this.task = this.data.selectedTask;
      this.isCreate = false;
    }
  }

  createTask(): void {
    this.planningService
      .createPlanningTask(this.task)
      .then(task => {
        this.uiActionsService.dialogTaskActionCreateTriggered(task);
      })
    // .catch(error => this.error = error); // TODO: Display error message
    this.uiActionsService.dialogTaskActionCreateTriggered(this.task);
    this.task = new PlanningTask();
  }

  modifyTask(): void {
    this.planningService
      .updatePlanningTask(this.task)
      .then(task => {

      });
    this.uiActionsService.dialogTaskActionUpdateTriggered(this.task);
    this.matDialogRef.close();
    // .catch(error => this.error = error); // TODO: Display error message
  }
}
