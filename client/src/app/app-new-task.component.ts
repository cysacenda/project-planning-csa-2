import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlanningService} from './shared/services/planning.service';
import {PlanningProject} from './shared/models/planning-project.model';
import {PlanningResource} from './shared/models/planning-resource.model';
import {PlanningTask} from './shared/models/planning-task.model';

@Component({
  selector: 'app-example-dialog',
  templateUrl: './app-new-task.component.html'
})
export class AddTaskComponent implements OnInit {
  @Input() task: PlanningTask;
  @Output() close = new EventEmitter();
  navigated = false; // true if navigated here

  projects: PlanningProject[] = [];
  resources: PlanningResource[] = [];

  // selectedProject: string;
  // selectedResource: string;

  constructor(private planningService: PlanningService) {
  }

  ngOnInit(): void {
    this.planningService.getProjects()
      .then(projects => this.projects = projects);

    this.planningService.getResources()
      .then(resources => this.resources = resources);

    // TODO : Default value
    // this.selectedProject = this.projects.

    this.navigated = false;
    this.task = new PlanningTask();

    /* TODO : cf. ce qui est fait dans hero-detail-component de angular-tour-of-heroes
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id)
          .then(hero => this.hero = hero);
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    }); */
  }

  createTask(): void {
    this.planningService
      .createPlanningTask(this.task)
      .then(task => {
        this.task = task; // saved task, w/ id if new
        this.goBack(task);
      })
    // .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedTask: PlanningTask = null): void {
    this.close.emit(savedTask);
    if (this.navigated) {
      window.history.back();
    }
  }
}
