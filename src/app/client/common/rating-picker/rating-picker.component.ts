import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestCountry} from '../../../../entity/country/rest-country';

@Component({
  selector: 'app-rating-picker',
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.scss']
})
export class RatingPickerComponent implements OnInit {

  @Input() itemId = 0;
  @Output() event: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  returnRatingValue(val: number): void {
    this.event.emit(val);
  }

}
