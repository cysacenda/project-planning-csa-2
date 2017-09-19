export interface PlanningTaskInterface {
  name: string;
  workload: number;
  etc: number;
  position: number;
  resourceTrigram: string;
  projectName: string;
  // daysArray: Map<Date, number>;
  daysMap: any;
}
