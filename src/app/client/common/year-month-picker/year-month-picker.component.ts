import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateService} from '../../../../service/date/date.service';


@Component({
  selector: 'app-year-month-picker',
  templateUrl: './year-month-picker.component.html',
  styleUrls: ['./year-month-picker.component.scss']
})
export class YearMonthPickerComponent implements OnInit {

  @Input() startDate = '';
  @Output() datePick: EventEmitter<string> = new EventEmitter();

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
    // this.startDate = '31.06.2018';
    this.defineStartSelectValues();
  }

  defineStartYear(): void {
    this.startYear = +this.startDate.substr(6, 4);
  }


  defineStartSelectValues(): void {
    this.defineStartYear();
    for (let i = this.startYear; i <= this.currentYear; i++) {
      this.yearSelectValues.push(i);
    }

    this.selectedYear = new Date().getFullYear();
    this.defineSelectedMonthByYear(this.currentYear);

  }

  defineSelectedMonthByYear(year: number): void {
    this.monthSelectValues = new Array<number>();

    this.startPickerMonth = +this.startDate[3] + +this.startDate[4] - 1;

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
    // this.selectedMonth = $event.target.value;
    this.emitDateChange();
  }

  emitDateChange(): void {
    const val = ('00' + this.selectedMonth).slice(-2) + '.' + this.selectedYear;
    this.datePick.emit(val);
  }
}
