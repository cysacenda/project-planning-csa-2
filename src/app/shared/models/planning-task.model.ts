export class PlanningTask {
  id: number;
  name: string;
  workload: number; // Charge
  etc: number; // Estimate to complete / RAE
  position: number;
  resourceId: number;
  projectId: number;

  daysMap: Map<Date, number>; // Days planned
}
