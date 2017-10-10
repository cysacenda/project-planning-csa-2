export class PlanningResource {
  _id: number;
  trigram: string;
  name: string;
  role: string;
  description: string;

  // TODO : Pourri car récupère Array
  vacationMap: Map<Date, number>; // Days off

  selected: boolean;
}
