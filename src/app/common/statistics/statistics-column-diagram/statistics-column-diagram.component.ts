import {Component, Input, OnInit} from '@angular/core';
import {DiagramStatisticsColumn} from '../../../../entity/statistics/advertisement/orders/diagram-statistics-column';
import {DateService} from '../../../../service/date/date.service';
import {DiagramColumnsStatisticsData} from '../../../../entity/statistics/advertisement/orders/diagram-columns-statistics-data';
import {StatisticsService} from '../../../../service/statistics/statistics.service';

@Component({
  selector: 'app-statistics-column-diagram',
  templateUrl: './statistics-column-diagram.component.html',
  styleUrls: ['./statistics-column-diagram.component.scss']
})
export class StatisticsColumnDiagramComponent implements OnInit {

  @Input() diagramData = new DiagramColumnsStatisticsData();
  @Input() columnWidth = '40px';
  @Input() columnsHeight = '400px';
  @Input() columnLabels = new Array<string>();
  @Input() advertisementId = 0;
  @Input() columnColor = '#0e4e6a';

  constructor() {
  }

  ngOnInit(): void {

  }

}
