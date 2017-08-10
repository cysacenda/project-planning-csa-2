// express
import { NextFunction, Response, Request, Router } from 'express';

// model
import { PlanningResourceModel, PlanningResourceModelInterface } from '../models/planning-resource.model';

export class PlanningResourceApi {

  public static create(router: Router) {
    // DELETE
    router.delete('/planning-resources/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningResourceApi().delete(req, res, next);
    });

    // GET
    router.get('/planning-resources', (req: Request, res: Response, next: NextFunction) => {
      new PlanningResourceApi().list(req, res, next);
    });
    router.get('/planning-resources/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningResourceApi().get(req, res, next);
    });

    // POST
    router.post('/planning-resources', (req: Request, res: Response, next: NextFunction) => {
      new PlanningResourceApi().create(req, res, next);
    });

    // PUT
    router.put('/planning-resources/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningResourceApi().update(req, res, next);
    });
  }
  public create(req: Request, res: Response, next: NextFunction) {
    // create planning-resource
    const planningResource = new PlanningResourceModel(req.body);
    planningResource.save().then(planningResourceObj => {
      res.json(planningResourceObj.toObject());
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

      // get planningResourceDocument
      PlanningResourceModel.findById(id).then(planningResource => {

      // verify planningResourceDocument exists
      if (planningResource === null) {
        res.sendStatus(404);
        next();
        return;
      }

        planningResource.remove().then(() => {
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

    // get planningResourceDocument
      PlanningResourceModel.findById(id).then(planningResource => {

      // verify planningResourceDocument was found
      if (planningResource === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // send json of planningResourceDocument object
      res.json(planningResource.toObject());
      next();
    }).catch(next);
  }
  public list(req: Request, res: Response, next: NextFunction) {
    // get heros
    PlanningResourceModel.find().then(planningResource => {
      res.json(planningResource.map(planningResourceObj => planningResourceObj.toObject()));
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

    // get planningResourceDocument
    PlanningResourceModel.findById(id).then(planningResource => {

      // verify planningResourceDocument was found
      if (planningResource === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // save planningResourceDocument
      Object.assign(planningResource, req.body).save().then((planningResourceObj: PlanningResourceModelInterface) => {
        res.json(planningResourceObj.toObject());
        next();
      }).catch(next);
    }).catch(next);
  }
}
