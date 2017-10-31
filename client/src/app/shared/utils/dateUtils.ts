export class DateUtils {

  public static addDays(date: string, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  public static getWorkloadForDate(taskMap: any, date: string, days: number): string {
    const tmpDate: string = DateUtils.addDays(date, days).toJSON();

    if (taskMap != null) {
      // TODO : Pas optimisé, ne pas faire à chaque fois, devrait être fait à la création de l'objet
      let taskDays: Map<string, number>;
      taskDays = new Map(taskMap.map((i) => [i.key, parseFloat(i.val)]));

      if (taskDays.has(tmpDate)) {
        return taskDays.get(tmpDate).toString();
      }
      return '';
    }
  }
}
