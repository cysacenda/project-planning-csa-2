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

  selected: boolean;
}
