export class PlanningTask {
  /*id: number;
   name: string;
   workload: number; // Charge
   etc: number; // Estimate to complete / RAE
   position: number;
   resource: string;
   project: string;*/

  daysMap: Map<Date, number>; // Days planned

  constructor(public id: number, public name: string, public workload: number, public etc: number, public position: number,
              public resource: string, public project: string, daysArray: any) {
    // TODO : Ne fonctionne pas à ajd, constructeur non appelé
    this.daysMap = new Map<Date, number>(daysArray.map((i) => [i.key, i.val]));
  }
}
