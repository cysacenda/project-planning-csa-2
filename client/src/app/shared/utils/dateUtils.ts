export class DateUtils {

  public static addDays(date: string, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  public static getWorkloadForDate(daysMaps: any, date: string, days: number, tmpBool?: boolean): string {
    let daysMap: Map<string, number> = daysMaps;
    const tmpDate: string = DateUtils.addDays(date, days).toJSON();

    if (daysMaps != null) {

      if (!tmpBool) {
        daysMap = new Map(daysMaps.map((i) => [i.key, parseFloat(i.val)]));
      }

      if (daysMap.has(tmpDate)) {
        return daysMap.get(tmpDate).toString();
      }

    }
    return '';
  }
}
