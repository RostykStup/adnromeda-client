import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating-view',
  templateUrl: './rating-view.component.html',
  styleUrls: ['./rating-view.component.scss']
})
export class RatingViewComponent implements OnInit {

  @Input() rating = 0;
  @Input() fontSize = '14px';

  constructor() {
  }

  ngOnInit(): void {
  }

  getStarsOverflowWidth(): number {
    return 100 - (this.rating * 100 / 5);
  }
}
