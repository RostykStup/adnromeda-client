import {Component, Input, OnInit} from '@angular/core';
import {DiagramStatisticsColumn} from '../../../../../../entity/statistics/advertisement/orders/diagram-statistics-column';

@Component({
  selector: 'app-statistics-rating-horizontal-column',
  templateUrl: './statistics-rating-horizontal-column.component.html',
  styleUrls: ['./statistics-rating-horizontal-column.component.scss']
})
export class StatisticsRatingHorizontalColumnComponent implements OnInit {

  @Input() label = '---';
  // @ts-ignore
  @Input() column: DiagramStatisticsColumn;
  @Input() columnColor = '#0e4e6a';

  constructor() {
  }

  ngOnInit(): void {
    // console.log(this.column);
  }
}
