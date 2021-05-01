export class MonthDayYear {
  day = 1;
  month = 1;
  year = 2000;

  createFromQuery(query: string): void {
    this.year = +query.substr(6, 4);
    this.day = +query.substr(0, 2);
    this.month = +query.substr(4, 2);
  }
}
