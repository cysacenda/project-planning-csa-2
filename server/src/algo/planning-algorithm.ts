import {PlanningTaskModel} from '../models/planning-task.model';
import {PlanningVacationModel} from '../models/planning-vacation.model';
import {PlanningParamsModel} from '../models/planning-params.model';
import mongoose = require('mongoose');

export class PlanningAlgo {
  // TODO : Config file
  private dbAdress: string = 'mongodb://localhost:27017/planning-csa';

  public async CalculPlanningForResource(resourceTrigram: string, closeConnection?: boolean) {
    await this.OpenConnection();

    // Récupération paramètres du planning
    const planningParams = await PlanningParamsModel.findOne();
    let currentDate = planningParams.currentDate;

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
    // Récupération d'un tableau d'objets
    const planningVacationsObj = await planningVacations.map(vacation => vacation.toObject());
    let tmpVacationsArray: any;
    tmpVacationsArray = planningVacationsObj;
    const planningVacationMap = await new Map<string, number>(tmpVacationsArray.map((i) => [i.vacationDate.toJSON(), i.value]));

    // Tant que RAE tâche > 0, en fct dispo collab, alimente tableau de dates
    for (let doc = await planningTasksCursor.next(); doc != null; doc = await planningTasksCursor.next()) {
      // Créer un tableau de dates avec structure [{key: XX, val: XX},{key: XX, val: XX}]
      const datesValuesMap = new Array();
      let etcToPlannify = doc.etc;
      while (etcToPlannify > 0) {
        // Pour la date en cours, récupérer dans planningVacations la charge
        // Prendre plus petit entre 1-planningVacations ET etc
        let availableAfterVacation: number = 1;
        if (planningVacationMap.has(currentDate.toJSON())) {
          availableAfterVacation = 1 - planningVacationMap.get(currentDate.toJSON());
        }
        const nbDaysToPlannify = Math.min(availableAfterVacation, etcToPlannify);
        if (nbDaysToPlannify > 0) {
          datesValuesMap.push({key: JSON.stringify(currentDate), val: nbDaysToPlannify});
          etcToPlannify = etcToPlannify - nbDaysToPlannify;
        }

        // Si il ne reste plus de charge planifiable sur la date
        if (nbDaysToPlannify + availableAfterVacation >= 1) {
          currentDate = this.getNextOpenDay(currentDate);
        }

        // Si dernière itération
        if (etcToPlannify === 0) {
          console.log(doc.resourceTrigram + ' - ' + doc.name);
          console.log(datesValuesMap);
          doc.daysMap = datesValuesMap;
          doc.save();
        }
      }
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

  public CalculFullPlanning() {
    this.OpenConnection();

    // Récupérer resources
    // Pour chaque resource, appeler CalculPlanningForResource

    this.CloseConnection();
  }

  private CloseConnection() {
    mongoose.connection.close();
  }

  private getNextOpenDay(date: Date): Date {
    // Si vendredi, passe à lundi
    let nbDaysToAdd = 1;
    if (date.getDay() === 5) {
      nbDaysToAdd = 3;
    }
    date.setDate(date.getDate() + nbDaysToAdd);
    return date;
  }
}
