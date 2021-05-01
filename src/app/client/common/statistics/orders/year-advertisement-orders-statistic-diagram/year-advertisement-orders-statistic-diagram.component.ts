import {Component, Input, OnInit} from '@angular/core';
import {DiagramStatisticsColumn} from '../../../../../../entity/statistics/advertisement/orders/diagram-statistics-column';
import {DateService} from '../../../../../../service/date/date.service';
import {DiagramColumnsStatisticsData} from '../../../../../../entity/statistics/advertisement/orders/diagram-columns-statistics-data';
import {StatisticsService} from '../../../../../../service/statistics/statistics.service';

@Component({
  selector: 'app-year-advertisement-orders-statistic',
  templateUrl: './year-advertisement-orders-statistic-diagram.component.html',
  styleUrls: ['./year-advertisement-orders-statistic-diagram.component.scss']
})
export class YearAdvertisementOrdersStatisticDiagramComponent implements OnInit {
  @Input() columnWidth = '8%';

  @Input() monthLabels = new Array<string>();

  // @ts-ignore
  @Input() diagramData: DiagramColumnsStatisticsData;

  @Input() advertisementId = 0;
  // @ts-ignore
  @Input() date: string;

  @Input() columnColor = '#0e4e6a';

  constructor(private dateService: DateService, private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    for (let i = 0; i <= 11; i++) {
      this.monthLabels.push(this.dateService.getShortUkrMonthNameByNumber(i));
    }
    this.statisticsService.getAdvertisementOrdersDataByYear(new Date().getFullYear(), this.advertisementId).subscribe((response) => {
      this.diagramData = response;
    });
  }

  getYearByCreationDate(): number {
    return +this.date.substr(6, 4);
  }

  pickedNewYear($event: number): void {
    this.statisticsService.getAdvertisementOrdersDataByYear($event, this.advertisementId).subscribe((response) => {
      this.diagramData = response;
    });
  }
}
