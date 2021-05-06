import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateService} from '../../../../service/date/date.service';
import {MonthDayYear} from '../../../../entity/date/month-day-year';

@Component({
  selector: 'app-year-month-picker',
  templateUrl: './year-month-picker.component.html',
  styleUrls: ['./year-month-picker.component.scss']
})
export class YearMonthPickerComponent implements OnInit {

  // @Input() startDate = '';

  // @ts-ignore
  @Input() startDate: MonthDayYear;
  @Output() datePick: EventEmitter<MonthDayYear> = new EventEmitter();

  month = '';

  startPickerMonth = 0;
  selectedMonth = 0;
  endPickerMonth = 11;

  startYear = 0;
  selectedYear = 0;
  currentYear = new Date().getFullYear();

  monthSelectValues = new Array<number>();
  yearSelectValues = new Array<number>();

  constructor(private dateService: DateService) {

  }

  ngOnInit(): void {
    console.log(this.startDate);
    this.defineStartSelectValues();
  }


  defineStartSelectValues(): void {
    this.startYear = this.startDate.year;
    for (let i = this.startYear; i <= this.currentYear; i++) {
      this.yearSelectValues.push(i);
    }
    this.selectedYear = new Date().getFullYear();
    this.defineSelectedMonthByYear(this.currentYear);
  }

  defineSelectedMonthByYear(year: number): void {
    this.monthSelectValues = new Array<number>();

    this.startPickerMonth = this.startDate.month - 1;

    if (this.startYear === this.currentYear) {
      this.endPickerMonth = new Date().getMonth();
    } else if (year === this.startYear) {
      this.endPickerMonth = 11;
    } else if (year === this.currentYear) {
      this.startPickerMonth = 0;
      this.endPickerMonth = new Date().getMonth();
    } else {
      this.startPickerMonth = 0;
      this.endPickerMonth = 11;
    }

    for (let i = this.startPickerMonth; i <= this.endPickerMonth; i++) {
      this.monthSelectValues.push(i);
    }

    this.selectedMonth = this.endPickerMonth;
  }

  getMonthName(n: number): string {
    return this.dateService.getUkrMonthNameByNumber(n);
  }

  changeYear($event: any): void {
    this.selectedYear = +$event.target.value;
    this.defineSelectedMonthByYear(this.selectedYear);

    this.emitDateChange();
  }

  changeMonth($event: any): void {
    this.emitDateChange();
  }

  emitDateChange(): void {
    const date = new MonthDayYear();
    date.month = +(+this.selectedMonth + 1);
    date.year = this.selectedYear;
    this.datePick.emit(date);
  }
}
