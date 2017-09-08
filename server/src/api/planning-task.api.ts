// express
import {NextFunction, Response, Request, Router} from 'express';

// model
import {PlanningTaskModel, PlanningTaskModelInterface} from '../models/planning-task.model';

export class PlanningTaskApi {

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

  public create(req: Request, res: Response, next: NextFunction) {
    PlanningTaskModel.find().sort({position: -1}).limit(1).then(planningtask => {
      // Get last task position + 1
      let position: number = 1;
      if (planningtask === null) {

      } else {
        position = planningtask[0].position + 1;
      }

      // Create new task
      const planningTask = new PlanningTaskModel(req.body);
      planningTask.set({position: position});
      planningTask.save().then(planningTaskObj => {
        res.json(planningTaskObj.toObject());
        next();
      }).catch(next);

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

  public

  get(req: Request, res: Response, next: NextFunction) {
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

      // verify planningTaskDocument was found
      if (planningTask === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // send json of planningTaskDocument object
      res.json(planningTask.toObject());
      next();
    }).catch(next);
  }

  public list(req: Request, res: Response, next: NextFunction) {
    // get heros
    PlanningTaskModel.find().then(planningTask => {
      res.json(planningTask.map(planningTaskObj => planningTaskObj.toObject()));
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

    // get planningTaskDocument
    PlanningTaskModel.findById(id).then(planningTask => {

      // verify planningTaskDocument was found
      if (planningTask === null) {
        res.sendStatus(404);
        next();
        return;
      }

      // save planningTaskDocument
      Object.assign(planningTask, req.body).save().then((planningTaskObj: PlanningTaskModelInterface) => {
        res.json(planningTaskObj.toObject());
        next();
      }).catch(next);
    }).catch(next);
  }
}
