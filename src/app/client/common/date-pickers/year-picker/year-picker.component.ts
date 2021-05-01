import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss']
})
export class YearPickerComponent implements OnInit {

  // @ts-ignore
  @Input() minYear: number;

  // @ts-ignore
  @Input() maxYear: number;

  @Output() yearPick: EventEmitter<number> = new EventEmitter();

  years = new Array<number>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.maxYear === undefined) {
      this.maxYear = new Date().getFullYear();
    }
    for (let i = this.minYear; i <= this.maxYear; i++) {
      this.years.push(i);
    }
  }

  selectNewYear($event: any): void {
    this.yearPick.emit(+$event.target.value);
  }
}
