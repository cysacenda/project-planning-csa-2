export interface PlanningTaskInterface {
  name: string;
  workload: number;
  etc: number;
  position: number;
  resource_id: string;
  resourceTrigram: string;
  project_id: string;
  projectName: string;
  // daysMap: Map<Date, number>;
  daysMap: any;
}
