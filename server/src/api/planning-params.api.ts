// express
import { NextFunction, Response, Request, Router } from 'express';

// model
import { PlanningParamsModel, PlanningParamsModelInterface } from '../models/planning-params.model';

/**
 * @class PlanningParamsApi
 */
export class PlanningParamsApi {

  /**
   * Create the api.
   * @static
   */
  public static create(router: Router) {
    // DELETE
    router.delete('/planning-params/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningParamsApi().delete(req, res, next);
    });

    // GET
    router.get('/planning-params', (req: Request, res: Response, next: NextFunction) => {
      new PlanningParamsApi().list(req, res, next);
    });
    router.get('/planning-params/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningParamsApi().get(req, res, next);
    });

    // POST
    router.post('/planning-params', (req: Request, res: Response, next: NextFunction) => {
      new PlanningParamsApi().create(req, res, next);
    });

    // PUT
    router.put('/planning-params/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningParamsApi().update(req, res, next);
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
    const planningParam = new PlanningParamsModel(req.body);
    planningParam.save().then(planningParams => {
      res.json(planningParams.toObject());
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

      // get planningParamsDocument
      PlanningParamsModel.findById(id).then(planningParams => {

      // verify planningParamsDocument exists
      if (planningParams === null) {
        res.sendStatus(404);
        next();
        return;
      }

        planningParams.remove().then(() => {
        res.sendStatus(200);
        next();
      }).catch(next);
    }).catch(next);
  }

  /**
   * Get a planningParamsDocument.
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
      PlanningParamsModel.findById(id).then(planningParams => {

      // verify planningParamsDocument was found
      if (planningParams === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // send json of planningParamsDocument object
      res.json(planningParams.toObject());
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
    PlanningParamsModel.find().then(planningParams => {
      res.json(planningParams.map(planningParam => planningParam.toObject()));
      next();
    }).catch(next);
  }

  /**
   * Update a planningParamsDocument.
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

    // get planningParamsDocument
    PlanningParamsModel.findById(id).then(planningParams => {

      // verify planningParamsDocument was found
      if (planningParams === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // save planningParamsDocument
      Object.assign(planningParams, req.body).save().then((planningParam: PlanningParamsModelInterface) => {
        res.json(planningParam.toObject());
        next();
      }).catch(next);
    }).catch(next);
  }

}
