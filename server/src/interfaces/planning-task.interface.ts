export interface PlanningTaskInterface {
  name: string;
  workload: number;
  etc: number;
  position: number;
  resourceTrigram: string;
  projectName: string;
  // daysMap: Map<Date, number>;
  daysMap: any;
}
