// express
import { NextFunction, Response, Request, Router } from 'express';

import { PlanningTaskModel } from '../models/planning-task.model';

export class PlanningProjectApi {

  public static create(router: Router) {
    // GET
    router.get('/planning-projects', (req: Request, res: Response, next: NextFunction) => {
      new PlanningProjectApi().list(req, res, next);
    });
  }

  public list(req: Request, res: Response, next: NextFunction) {
    // get projects
    PlanningTaskModel.distinct('projectName').then(planningProjects => {
      res.json(planningProjects);
      next();
    }).catch(next);
  }
}
