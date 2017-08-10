// express
import { NextFunction, Response, Request, Router } from 'express';

// model
import { PlanningProjectModel, PlanningProjectModelInterface } from '../models/planning-project.model';

export class PlanningProjectApi {

  public static create(router: Router) {
    // DELETE
    router.delete('/planning-projects/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningProjectApi().delete(req, res, next);
    });

    // GET
    router.get('/planning-projects', (req: Request, res: Response, next: NextFunction) => {
      new PlanningProjectApi().list(req, res, next);
    });
    router.get('/planning-projects/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningProjectApi().get(req, res, next);
    });

    // POST
    router.post('/planning-projects', (req: Request, res: Response, next: NextFunction) => {
      new PlanningProjectApi().create(req, res, next);
    });

    // PUT
    router.put('/planning-projects/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningProjectApi().update(req, res, next);
    });
  }
  public create(req: Request, res: Response, next: NextFunction) {
    // create planning-project
    const planningProject = new PlanningProjectModel(req.body);
    planningProject.save().then(planningProjectObj => {
      res.json(planningProjectObj.toObject());
      next();
    }).catch(next);
  }
  public delete(req: Request, res: Response, next: NextFunction) {
    // verify the id parameter exists
    const PARAM_ID: string = 'id';
    if (req.params[PARAM_ID] === undefined) {
      res.sendStatus(404);
      next();
      return;
    }

    // get id
    const id: string = req.params[PARAM_ID];

      // get planningProjectDocument
      PlanningProjectModel.findById(id).then(planningProject => {

      // verify planningProjectDocument exists
      if (planningProject === null) {
        res.sendStatus(404);
        next();
        return;
      }

        planningProject.remove().then(() => {
        res.sendStatus(200);
        next();
      }).catch(next);
    }).catch(next);
  }
  public get(req: Request, res: Response, next: NextFunction) {
    // verify the id parameter exists
    const PARAM_ID: string = 'id';
    if (req.params[PARAM_ID] === undefined) {
      res.sendStatus(404);
      next();
      return;
    }

    // get id
    const id: string = req.params[PARAM_ID];

    // get planningProjectDocument
      PlanningProjectModel.findById(id).then(planningProject => {

      // verify planningProjectDocument was found
      if (planningProject === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // send json of planningProjectDocument object
      res.json(planningProject.toObject());
      next();
    }).catch(next);
  }
  public list(req: Request, res: Response, next: NextFunction) {
    // get heros
    PlanningProjectModel.find().then(planningProjects => {
      res.json(planningProjects.map(planningProject => planningProject.toObject()));
      next();
    }).catch(next);
  }
  public update(req: Request, res: Response, next: NextFunction) {
    const PARAM_ID: string = 'id';

    // verify the id parameter exists
    if (req.params[PARAM_ID] === undefined) {
      res.sendStatus(404);
      next();
      return;
    }

    // get id
    const id: string = req.params[PARAM_ID];

    // get planningProjectDocument
    PlanningProjectModel.findById(id).then(planningProject => {

      // verify planningProjectDocument was found
      if (planningProject === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // save planningProjectDocument
      Object.assign(planningProject, req.body).save().then((planningProjectObj: PlanningProjectModelInterface) => {
        res.json(planningProjectObj.toObject());
        next();
      }).catch(next);
    }).catch(next);
  }
}
