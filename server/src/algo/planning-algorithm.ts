import {PlanningTaskModel} from '../models/planning-task.model';
import {PlanningVacationModel} from '../models/planning-vacation.model';
import {PlanningParamsModel} from '../models/planning-params.model';
import mongoose = require('mongoose');

export class PlanningAlgo {
  // TODO : Config file
  private dbAdress: string = 'mongodb://localhost:27017/planning-csa';

  public CalculFullPlanning() {
    this.OpenConnection();

    // Récupérer resources
    // Pour chaque resource, appeler CalculPlanningForResource

    this.CloseConnection();
  }

  public async CalculPlanningForResource(resourceTrigram: string, closeConnection?: boolean) {
    await this.OpenConnection();

    // Récupération paramètres du planning
    const planningParams = await PlanningParamsModel.findOne();
    const currentDate = planningParams.currentDate;

    // let taskDays: Map<string, number>;
    // taskDays = new Map(taskArray.map((i) => [i.key, parseFloat(i.vacationDate)]));

    // Récupérer toutes les taches d'une resource, non terminées (etc <> 0) triées par position
    const planningTasksCursor = await PlanningTaskModel.find({
      resourceTrigram: resourceTrigram,
      etc: {'$ne': 0}
    }).sort({position: 1}).cursor();

    // Récupérer jours fériés applicables à toutes les ressources (ALL) et les congés de la ressource triées par date asc
    const planningVacations = await PlanningVacationModel.find(
      {
        $or: [
          {resourceTrigram: resourceTrigram},
          {resourceTrigram: 'ALL'}
        ]
      }).sort({val: 1});

    // Tant que RAE tâche > 0, en fct dispo collab, alimente tableau de dates
    for (let doc = await planningTasksCursor.next(); doc != null; doc = await planningTasksCursor.next()) {

      console.log(doc.workload);
    }


    /* if (typeof(closeConnection) === 'boolean' && closeConnection) {
      this.CloseConnection();
    } */
  }

  private OpenConnection() {
    mongoose.Promise = require('bluebird');
    mongoose.connect(this.dbAdress,
      {
        useMongoClient: true,
      });

    mongoose.connection.on('error', error => {
      console.error(error);
    });
  }

  private CloseConnection() {
    mongoose.connection.close();
  }
}
