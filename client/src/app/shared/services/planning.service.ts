import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {PlanningProject} from '../models/planning-project.model';
import {PlanningResource} from '../models/planning-resource.model';
import {PlanningTask} from '../models/planning-task.model';
import {PlanningParams} from '../models/planning-params.model';

@Injectable()
export class PlanningService {
  // URL to web api
  private projectsUrl = 'app/projects';
  private resourcesUrl = 'app/resources';
  private planningTasksUrl = 'app/planningTasks';
  // private planningParamsUrl = 'app/planningParams';
  private planningParamsUrl = 'http://localhost:3000/api/planning-params';

  constructor(private http: Http) {
  }

  getProjects(): Promise<Array<PlanningProject>> {
    return this.http
      .get(this.projectsUrl)
      .toPromise()
      .then((response) => {
        return response.json().data as PlanningProject[];
      })
      .catch(this.handleError);
  }

  getResources(): Promise<Array<PlanningResource>> {
    return this.http
      .get(this.resourcesUrl)
      .toPromise()
      .then((response) => {
        return response.json().data as PlanningResource[];
      })
      .catch(this.handleError);
  }

  getPlanningTasks(): Promise<Array<PlanningTask>> {
      return this.http
        .get(this.planningTasksUrl)
        .toPromise()
        // .map((response: Response) => response.json()))
         .then((response) => {
           return response.json().data as PlanningTask[];
         })
        .catch(this.handleError);
  }

  getPlanningParams(): Promise<PlanningParams> {
    return this.http
      .get(this.planningParamsUrl)
      .toPromise()
      .then((response) => {
      console.log(response.json());
         return (response.json() as PlanningParams[])[0];
        // let obj = new PlanningParams();
        // return Object.assign(obj, response.json());
      })
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
