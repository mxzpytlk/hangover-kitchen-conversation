export class DateUtils {
  public static daysBetweenDates(first: Date, second: Date): number {
    const miliseconds = DateUtils.milisecondsBetweenDates(first, second);
    return Math.floor(DateUtils.milisecondsToDays(miliseconds));
  }

  public static daysToMiliseconds(days: number) {
    return days * 24 * 60 * 60 * 1e3;
  }

  public static milisecondsToDays(miliseconds: number) {
    return miliseconds / 24 / 60 / 60 / 1e3;
  }

  public static milisecondsBetweenDates(first: Date, second: Date): number {
    return Math.abs(first.getTime() - second.getTime());
  }
}
