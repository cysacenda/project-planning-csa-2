import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Project} from '../models/project.model';
import {Resource} from '../models/resource.model';
import {PlanningTask} from '../models/planning-task.model';

@Injectable()
export class PlanningService {
  // URL to web api
  private projectsUrl = 'app/projects';
  private resourcesUrl = 'app/resources';
  private planningTasksUrl = 'app/planningTasks';

  constructor(private http: Http) { }

  getProjects(): Promise<Array<Project>> {
    return this.http
      .get(this.projectsUrl)
      .toPromise()
      .then((response) => {
        return response.json().data as Project[];
      })
      .catch(this.handleError);
  }

  getResources(): Promise<Array<Resource>> {
    return this.http
      .get(this.resourcesUrl)
      .toPromise()
      .then((response) => {
        return response.json().data as Resource[];
      })
      .catch(this.handleError);
  }

  getPlanningTasks(): Promise<Array<PlanningTask>> {
    return this.http
      .get(this.planningTasksUrl)
      .toPromise()
      .then((response) => {
        return response.json().data as PlanningTask[];
      })
      .catch(this.handleError);
  }

  // TODO : A gérer différemment
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

/*
  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  save(hero: Hero): Promise<Hero> {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  delete(hero: Hero): Promise<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Hero
  private put(hero: Hero): Promise<Hero> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .put(url, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  */
}
