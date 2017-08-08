// express
import { NextFunction, Response, Request, Router } from 'express';

// model
import { PlanningTaskModel, PlanningTaskModelInterface } from '../models/planning-task.model';

/**
 * @class PlanningTaskApi
 */
export class PlanningTaskApi {

  /**
   * Create the api.
   * @static
   */
  public static create(router: Router) {
    // DELETE
    router.delete('/planning-tasks/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningTaskApi().delete(req, res, next);
    });

    // GET
    router.get('/planning-tasks', (req: Request, res: Response, next: NextFunction) => {
      new PlanningTaskApi().list(req, res, next);
    });
    router.get('/planning-tasks/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningTaskApi().get(req, res, next);
    });

    // POST
    router.post('/planning-tasks', (req: Request, res: Response, next: NextFunction) => {
      new PlanningTaskApi().create(req, res, next);
    });

    // PUT
    router.put('/planning-tasks/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningTaskApi().update(req, res, next);
    });
  }

  /**
   * Create a new planning-params.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public create(req: Request, res: Response, next: NextFunction) {
    // create planning-params
    const planningParam = new PlanningTaskModel(req.body);
    planningParam.save().then(planningTask => {
      res.json(planningTask.toObject());
      next();
    }).catch(next);
  }

  /**
   * Delete a planning-params.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
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

      // get planningTaskDocument
      PlanningTaskModel.findById(id).then(planningTask => {

      // verify planningTaskDocument exists
      if (planningTask === null) {
        res.sendStatus(404);
        next();
        return;
      }

        planningTask.remove().then(() => {
        res.sendStatus(200);
        next();
      }).catch(next);
    }).catch(next);
  }

  /**
   * Get a planningTaskDocument.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
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

    // get planningParamsDocument
      PlanningTaskModel.findById(id).then(planningTask => {

      // verify planningParamsDocument was found
      if (planningTask === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // send json of planningParamsDocument object
      res.json(planningTask.toObject());
      next();
    }).catch(next);
  }

  /**
   * List all heros.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
  public list(req: Request, res: Response, next: NextFunction) {
    // get heros
    PlanningTaskModel.find().then(planningTask => {
      res.json(planningTask.map(planningParam => planningParam.toObject()));
      next();
    }).catch(next);
  }

  /**
   * Update a planningTaskDocument.
   * @param req {Request} The express request object.
   * @param res {Response} The express response object.
   * @param next {NextFunction} The next function to continue.
   */
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

    // get planningTaskDocument
    PlanningTaskModel.findById(id).then(planningTask => {

      // verify planningTaskDocument was found
      if (planningTask === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // save planningTaskDocument
      Object.assign(planningTask, req.body).save().then((planningTsk: PlanningTaskModelInterface) => {
        res.json(planningTsk.toObject());
        next();
      }).catch(next);
    }).catch(next);
  }

}
