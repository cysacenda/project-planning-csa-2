import {Component, OnInit} from '@angular/core';
import {PlanningService} from './shared/services/planning.service';
import {Project} from './shared/models/project.model';
import {Resource} from './shared/models/resource.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class ScheduleComponent implements OnInit {
  projects: Project[] = [];
  resources: Resource[] = [];

  constructor(
    private planningService: PlanningService) {
  }

  ngOnInit(): void {
    this.planningService.getProjects()
      .then(projects => this.projects = projects);

    this.planningService.getResources()
      .then(resources => this.resources = resources);
  }

}
