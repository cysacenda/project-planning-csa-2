import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import {PlanningResource} from '../models/planning-resource.model';
import {PlanningTask} from '../models/planning-task.model';
import {PlanningParams} from '../models/planning-params.model';
import {environment} from '../../../environments/environment';

@Injectable()
export class PlanningApiService {
  private basicURL: string = environment.apiUrl;

  // URL to web api
  private projectsUrl: string = this.basicURL + environment.projectsUrl;
  private resourcesUrl: string = this.basicURL + environment.resourcesUrl;
  private tasksUrl: string = this.basicURL + environment.tasksUrl;
  private paramsUrl: string = this.basicURL + environment.paramsUrl;

  constructor(private http: Http) {
  }

  // region Projects

  public getProjects(): Promise<Array<String>> {
    return this.http
      .get(this.projectsUrl)
      .toPromise()
      .then((response) => {
        return response.json() as String[];
      })
      .catch(this.handleError);
  }

  // endregion

  // region Params

  public getParams(): Promise<PlanningParams> {
    return this.http
      .get(this.paramsUrl)
      .toPromise()
      .then((response) => {
        return (response.json() as PlanningParams[])[0];
      })
      .catch(this.handleError);
  }

  public updatePlanningParams(planningParams: PlanningParams): Promise<PlanningParams> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .put(this.paramsUrl + '/' + planningParams._id, JSON.stringify(planningParams), {headers: headers})
      .map(response => response.json())
      .toPromise()
      .catch(this.handleError);
  }

  // endregion

  // region Tasks

  public getTasks(): Promise<Array<PlanningTask>> {
    return this.http
      .get(this.tasksUrl)
      .toPromise()
      .then((response) => {
        return response.json().map(item => {
          return this.instanciatePlanningTask(item);
        }) as PlanningTask[];
      })
      .catch(this.handleError);
  }

  public createPlanningTask(planningTask: PlanningTask): Promise<PlanningTask> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.tasksUrl, JSON.parse(JSON.stringify(planningTask)), {headers: headers})
      .map(response => this.instanciatePlanningTask(response.json()))
      .toPromise()
      .catch(this.handleError);
  }

  public updatePlanningTask(planningTask: PlanningTask): Promise<PlanningTask> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .put(this.tasksUrl + '/' + planningTask._id, JSON.parse(JSON.stringify(planningTask)), {headers: headers})
      .map(response => this.instanciatePlanningTask(response.json()))
      .toPromise()
      .catch(this.handleError);
  }

  public deletePlanningTask(planningTaskId: string) {
    return this.http
      .delete(this.tasksUrl + '/' + planningTaskId)
      .toPromise()
      .catch(this.handleError);
  }

  public updateTasksBulk(tasksList: any) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .patch(this.tasksUrl, JSON.stringify(tasksList), {headers: headers})
      .toPromise()
      .catch(this.handleError);
  }

  public getResources(): Promise<Array<PlanningResource>> {
    return this.http
      .get(this.resourcesUrl)
      .toPromise()
      .then((response) => {
        return response.json().map(item => {
          return this.instanciateResource(item);
        }) as PlanningResource[];
      })
      .catch(this.handleError);
  }

  // endregion

  // region Resources

  public createPlanningResource(planningResource: PlanningResource): Promise<PlanningResource> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.resourcesUrl, JSON.parse(JSON.stringify(planningResource)), {headers: headers})
      .map(response => this.instanciateResource(response.json()))
      .toPromise()
      .catch(this.handleError);
  }

  public deletePlanningResource(planningResourceId: string) {
    return this.http
      .delete(this.resourcesUrl + '/' + planningResourceId)
      .toPromise()
      .catch(this.handleError);
  }

  public updatePlanningResource(planningResource: PlanningResource): Promise<PlanningResource> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .put(this.resourcesUrl + '/' + planningResource._id, JSON.parse(JSON.stringify(planningResource)), {headers: headers})
      .map(response => this.instanciateResource(response.json()))
      .toPromise()
      .catch(this.handleError);
  }

  private instanciatePlanningTask(item): PlanningTask {
    let daysMap: Map<string, number>;
    if (item.daysMap != null) {
      daysMap = new Map(item.daysMap.map((i) => [i.key, parseFloat(i.val)]));
    } else {
      daysMap = new Map();
    }

    return new PlanningTask(
      item._id,
      item.name,
      item.workload,
      item.etc,
      item.position,
      item.resourceTrigram,
      item.projectName,
      item.isMilestone,
      item.milestoneDate,
      daysMap,
      false);
  }

  private instanciateResource(item): PlanningResource {
    let vacationMap: Map<string, number>;
    if (item.vacationMap != null) {
      vacationMap = new Map(item.vacationMap.map((i) => [i.key, parseFloat(i.val)]));
    } else {
      vacationMap = new Map();
    }

    return new PlanningResource(
      item._id,
      item.trigram,
      item.name,
      item.role,
      item.description,
      vacationMap,
      false);
  }

  // endregion Resources

  // TODO : A gérer différemment
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
