// express
import {NextFunction, Request, Response, Router} from 'express';
// model
import {PlanningVacationModel, PlanningVacationModelInterface} from '../models/planning-vacation.model';

export class PlanningVacationApi {
  public static create(router: Router) {
    // DELETE
    router.delete('/planning-vacations/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningVacationApi().delete(req, res, next);
    });

    // GET
    router.get('/planning-vacations', (req: Request, res: Response, next: NextFunction) => {
      new PlanningVacationApi().list(req, res, next);
    });
    router.get('/planning-vacations/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningVacationApi().get(req, res, next);
    });

    // POST
    router.post('/planning-vacations', (req: Request, res: Response, next: NextFunction) => {
      new PlanningVacationApi().create(req, res, next);
    });

    // PUT
    router.put('/planning-vacations/:id([0-9a-f]{24})', (req: Request, res: Response, next: NextFunction) => {
      new PlanningVacationApi().update(req, res, next);
    });
  }

  public create(req: Request, res: Response, next: NextFunction) {
    // create planning-vacation
    const planningVacationObj = new PlanningVacationModel(req.body);
    planningVacationObj.save().then(planningVacation => {
      res.json(planningVacation.toObject());
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

    // get planningVacationDocument
    PlanningVacationModel.findById(id).then(planningVacation => {

      // verify planningVacationDocument exists
      if (planningVacation === null) {
        res.sendStatus(404);
        next();
        return;
      }

      planningVacation.remove().then(() => {
        res.sendStatus(200);
        next();
      }).catch(next);
    }).catch(next);
  }

  public get (req: Request, res: Response, next: NextFunction) {
    // verify the id parameter exists
    const PARAM_ID: string = 'id';
    if (req.params[PARAM_ID] === undefined) {
      res.sendStatus(404);
      next();
      return;
    }

    // get id
    const id: string = req.params[PARAM_ID];

    // get planningVacationDocument
    PlanningVacationModel.findById(id).then(planningVacation => {

      // verify planningVacationDocument was found
      if (planningVacation === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // send json of planningVacationDocument object
      res.json(planningVacation.toObject());
      next();
    }).catch(next);
  }

  public list(req: Request, res: Response, next: NextFunction) {
    // get heros
    PlanningVacationModel.find().then(planningVacation => {
      res.json(planningVacation.map(planningVacationObj => planningVacationObj.toObject()));
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

    // get planningVacationDocument
    PlanningVacationModel.findById(id).then(planningVacation => {

      // verify planningVacationDocument was found
      if (planningVacation === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // save planningVacationDocument
      Object.assign(planningVacation, req.body).save().then((planningVacationObj: PlanningVacationModelInterface) => {
        res.json(planningVacationObj.toObject());
        next();
      }).catch(next);
    }).catch(next);
  }
}
