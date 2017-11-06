export class DateUtils {

  public static addDays(date: string, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  public static getWorkloadForDate(daysMap: Map<string, number>, date: string, days: number): string {
    const tmpDate: string = DateUtils.addDays(date, days).toJSON();

    if (daysMap != null && daysMap.size > 0) {
      if (daysMap.has(tmpDate)) {
        return daysMap.get(tmpDate).toString();
      }

    }
    return '';
  }
}
