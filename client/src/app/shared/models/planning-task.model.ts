export class PlanningTask {
  _id: number;
  name: string;
  workload: number; // Charge
  etc: number; // Estimate to complete / RAE
  position: number;

  resourceTrigram: string;

  projectName: string;

  // TODO : Pourri car récupère Array
  daysMap: Map<Date, number>; // Days planned

  /*
  constructor(public id: number, public name: string, public workload: number, public etc: number, public position: number,
              public resourceTrigram: string, public projectName: string, daysArray: any) {
    // TODO : Ne fonctionne pas à ajd, constructeur non appelé
    this.daysMap = new Map<Date, number>(daysArray.map((i) => [i.key, i.val]));
  }
  */
}
