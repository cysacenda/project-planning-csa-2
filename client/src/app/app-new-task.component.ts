import {Component, EventEmitter, OnInit} from '@angular/core';
import {PlanningApiService} from './shared/services/planning.api.service';
import {PlanningResource} from './shared/models/planning-resource.model';
import {PlanningTask} from './shared/models/planning-task.model';
import {DialogAction, UIActionsService} from './shared/services/ui.actions.service';

@Component({
  selector: 'app-example-dialog',
  templateUrl: './app-new-task.component.html'
})
export class AddTaskComponent implements OnInit {
  task: PlanningTask;
  close = new EventEmitter();

  projects: String[] = [];
  resources: PlanningResource[] = [];

  constructor(private planningService: PlanningApiService,
              private uiActionsService: UIActionsService) {
  }

  ngOnInit(): void {
    this.planningService.getProjects()
      .then(projects => this.projects = projects);

    this.planningService.getResources()
      .then(resources => this.resources = resources);

    this.task = new PlanningTask();
  }

  createTask(): void {
    this.planningService
      .createPlanningTask(this.task)
      .then(task => {
        this.task = new PlanningTask();
        this.uiActionsService.dialogActionTriggered(task, DialogAction.Create);
        // this.goBack(task);
      })
    // .catch(error => this.error = error); // TODO: Display error message
  }

  // TODO : ?
  /* goBack(savedTask: PlanningTask = null): void {
    this.close.emit(savedTask);
    if (this.navigated) {
      window.history.back();
    }
  } */
}
