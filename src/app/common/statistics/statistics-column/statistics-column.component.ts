import {Component, Input, OnInit} from '@angular/core';
import {DiagramStatisticsColumn} from '../../../../entity/statistics/advertisement/orders/diagram-statistics-column';

@Component({
  selector: 'app-statistic-column',
  templateUrl: './statistics-column.component.html',
  styleUrls: ['./statistics-column.component.scss']
})
export class StatisticsColumnComponent implements OnInit {

  @Input() label = '---';
  // @ts-ignore
  @Input() column: DiagramStatisticsColumn;
  @Input() columnColor = '#0e4e6a';

  constructor() { }

  ngOnInit(): void {
    // console.log(this.column);
  }

}
