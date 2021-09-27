export class DateUtils {
  public static daysToMiliseconds(days: number) {
    return days * 24 * 60 * 60 * 1e3;
  }
}
