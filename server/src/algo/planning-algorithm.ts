import {PlanningTaskModel} from '../models/planning-task.model';
import {PlanningParamsModel} from '../models/planning-params.model';
import {PlanningResourceModel} from '../models/planning-resource.model';
import mongoose = require('mongoose');

export class PlanningAlgo {
  // TODO : Config file
  private dbAdress: string = 'mongodb://localhost:27017/planning-csa';

  public async CalculFullPlanning() {
    await this.OpenConnection();

    const planningResourcesCursor = await PlanningResourceModel.find().cursor();
    for (let doc = await planningResourcesCursor.next(); doc != null; doc = await planningResourcesCursor.next()) {
      await this.CalculPlanningForResource(doc.trigram, false);
    }

    this.CloseConnection();
  }

  public async CalculPlanningForResource(resourceTrigram: string, useConnection?: boolean) {
    if (typeof(useConnection) === 'boolean' && useConnection) {
      await this.OpenConnection();
    }

    // Récupération paramètres du planning
    const planningParams = await PlanningParamsModel.findOne();
    let currentDate = planningParams.currentDate;

    // Récupérer toutes les taches d'une resource, non terminées (etc <> 0) triées par position
    const planningTasksCursor = await PlanningTaskModel.find({
      resourceTrigram: resourceTrigram,
      etc: {'$ne': 0}
    }).sort({position: 1}).cursor();

    const planningResource = await PlanningResourceModel.findOne({trigram: resourceTrigram});

    // Récupération d'un tableau d'objets
    const planningResourceVacationsObj = await planningResource.vacationMap.map(vacation => vacation.toObject());
    let tmpResourceVacationsArray: any;
    tmpResourceVacationsArray = planningResourceVacationsObj;
    const planningResourceVacationMap: Map<string, number> = await new Map<string, number>(tmpResourceVacationsArray.map((i) => [i.key, i.val]));

    let alreadyPlannedOnLastTask: number = 0;

    // Tant que RAE tâche > 0, en fct dispo collab, alimente tableau de dates
    for (let doc = await planningTasksCursor.next(); doc != null; doc = await planningTasksCursor.next()) {
      const datesValuesMap = new Array();
      let etcToPlannify = doc.etc;

      while (etcToPlannify > 0) {
        let incrementDate: Boolean = true;
        let availableAfterVacation: number = 1;

        if (planningResourceVacationMap.has(currentDate.toJSON())) {
          availableAfterVacation = 1 - planningResourceVacationMap.get(currentDate.toJSON());
        }

        // Si on a déjà planifié de la charge pour une autre tâche sur cette date
        if (alreadyPlannedOnLastTask > 0) {
          availableAfterVacation -= alreadyPlannedOnLastTask;
          alreadyPlannedOnLastTask = 0;
        }

        const nbDaysToPlannify = Math.min(availableAfterVacation, etcToPlannify);
        if (nbDaysToPlannify > 0) {
          datesValuesMap.push({key: currentDate.toJSON(), val: nbDaysToPlannify});
          etcToPlannify = etcToPlannify - nbDaysToPlannify;
        }

        // Si dernière itération
        if (etcToPlannify === 0) {
          console.log(doc.resourceTrigram + ' - ' + doc.name);
          console.log(datesValuesMap);
          doc.daysMap = datesValuesMap;
          doc.save();

          // Si la charge planifiée est inférieure à la charge dispo ce jour-ci
          if (availableAfterVacation - nbDaysToPlannify > 0) {
            incrementDate = false;
            alreadyPlannedOnLastTask = nbDaysToPlannify;
          }
        }

        if (incrementDate) {
          currentDate = this.getNextOpenDay(currentDate);
        }
      }
    }

    if (typeof(useConnection) === 'boolean' && useConnection) {
      this.CloseConnection();
    }
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
