export class PlanningTask {
  /*id: number;
   name: string;
   workload: number; // Charge
   etc: number; // Estimate to complete / RAE
   position: number;
   resourceId: number;
   projectId: number;*/

  daysMap: Map<Date, number>; // Days planned

  constructor(public id: number, public name: string, public workload: number, public etc: number, public position: number,
              public resourceId: number, public projectId: number, daysArray: any) {
    this.daysMap = new Map<Date, number>(daysArray.map((i) => [i.key, i.val]));
  }
}
