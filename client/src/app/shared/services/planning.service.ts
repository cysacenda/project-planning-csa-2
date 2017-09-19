import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import {PlanningResource} from '../models/planning-resource.model';
import {PlanningTask} from '../models/planning-task.model';
import {PlanningParams} from '../models/planning-params.model';

@Injectable()
export class PlanningService {

  // Base URL to api
  // TODO : conf file
  // TODO : A dissocier en plusieurs services (1 par objet !)
  private basicURL: string = 'http://localhost:3000/api/';

  // URL to web api
  private projectsUrl: string = this.basicURL + 'planning-projects';
  private resourcesUrl: string = this.basicURL + 'planning-resources';
  private planningTasksUrl: string = this.basicURL + 'planning-tasks';

  // private planningParamsUrl = 'app/planningParams';
  private planningParamsUrl: string = this.basicURL + 'planning-params';

  constructor(private http: Http) {
  }

  getProjects(): Promise<Array<String>> {
    return this.http
      .get(this.projectsUrl)
      .toPromise()
      .then((response) => {
        return response.json() as String[];
      })
      .catch(this.handleError);
  }

  getResources(): Promise<Array<PlanningResource>> {
    return this.http
      .get(this.resourcesUrl)
      .toPromise()
      .then((response) => {
        return response.json() as PlanningResource[];
      })
      .catch(this.handleError);
  }

  getPlanningTasks(): Promise<Array<PlanningTask>> {
    return this.http
      .get(this.planningTasksUrl)
      .toPromise()
      .then((response) => {
        return response.json() as PlanningTask[];
      })
      .catch(this.handleError);
  }

  getPlanningParams(): Promise<PlanningParams> {
    return this.http
      .get(this.planningParamsUrl)
      .toPromise()
      .then((response) => {
        return (response.json() as PlanningParams[])[0];
      })
      .catch(this.handleError);
  }

  createPlanningTask(planningTask: PlanningTask): Promise<PlanningTask> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.planningTasksUrl, JSON.stringify(planningTask), {headers: headers})
      .toPromise()
      /*.then(res => res.json().data) */
      .catch(this.handleError);
  }

  // TODO : A gérer différemment
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  /*
   getHero(id: number): Promise<PlanningParamsInterface> {
   return this.getHeroes()
   .then(heroes => heroes.find(planningParamsDocument => planningParamsDocument.id === id));
   }

   save(planningParamsDocument: PlanningParamsInterface): Promise<PlanningParamsInterface> {
   if (planningParamsDocument.id) {
   return this.put(planningParamsDocument);
   }
   return this.post(planningParamsDocument);
   }

   delete(planningParamsDocument: PlanningParamsInterface): Promise<Response> {
   const headers = new Headers();
   headers.append('Content-Type', 'application/json');

   const url = `${this.heroesUrl}/${planningParamsDocument.id}`;

   return this.http
   .delete(url, { headers: headers })
   .toPromise()
   .catch(this.handleError);
   }

   // Add new PlanningParamsInterface
   private post(planningParamsDocument: PlanningParamsInterface): Promise<PlanningParamsInterface> {
   const headers = new Headers({
   'Content-Type': 'application/json'
   });

   return this.http
   .post(this.heroesUrl, JSON.stringify(planningParamsDocument), { headers: headers })
   .toPromise()
   .then(res => res.json().data)
   .catch(this.handleError);
   }

   // Update existing PlanningParamsInterface
   private put(planningParamsDocument: PlanningParamsInterface): Promise<PlanningParamsInterface> {
   const headers = new Headers();
   headers.append('Content-Type', 'application/json');

   const url = `${this.heroesUrl}/${planningParamsDocument.id}`;

   return this.http
   .put(url, JSON.stringify(planningParamsDocument), { headers: headers })
   .toPromise()
   .then(() => planningParamsDocument)
   .catch(this.handleError);
   }

   */
}
