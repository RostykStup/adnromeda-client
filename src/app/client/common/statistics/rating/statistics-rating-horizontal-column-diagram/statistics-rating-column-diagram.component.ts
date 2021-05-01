import {Component, Input, OnInit} from '@angular/core';
import {DiagramColumnsStatisticsData} from '../../../../../../entity/statistics/advertisement/orders/diagram-columns-statistics-data';
import {DiagramStatisticsColumn} from '../../../../../../entity/statistics/advertisement/orders/diagram-statistics-column';

@Component({
  selector: 'app-statistics-rating-horizontal-column-diagram',
  templateUrl: './statistics-rating-column-diagram.component.html',
  styleUrls: ['./statistics-rating-column-diagram.component.scss']
})
export class StatisticsRatingColumnDiagramComponent implements OnInit {

  @Input() diagramData = new DiagramColumnsStatisticsData();
  @Input() columnHeight = '40px';
  @Input() columnsWidth = '400px';
  @Input() columnsHeight = '700px';
  @Input() columnLabels = new Array<string>();
  @Input() advertisementId = 0;
  @Input() columnColor = '#0e4e6a';

  constructor() {
  }

  ngOnInit(): void {

  }

  defineRatingColumnColor(rating: number): string {
    switch (rating) {
      case 0: return  '#07ea64';
      case 1: return  '#49de78';
      case 2: return  '#a3f36c';
      case 3: return  '#dd6b6b';
      case 4: return  '#f52323';
    }
    return '#049139';
  }

}
