import {Component, Input, OnInit} from '@angular/core';
import {DiagramColumnsStatisticsData} from '../../../../../entity/statistics/advertisement/orders/diagram-columns-statistics-data';
import {DateService} from '../../../../../service/date/date.service';
import {StatisticsService} from '../../../../../service/statistics/statistics.service';
import {MonthDayYear} from '../../../../../entity/date/month-day-year';

@Component({
  selector: 'app-rating-feedbacks-diagram',
  templateUrl: './rating-feedbacks-diagram.component.html',
  styleUrls: ['./rating-feedbacks-diagram.component.scss']
})
export class RatingFeedbacksDiagramComponent implements OnInit {

  @Input() columnHeight = '14%';

  @Input() ratingLabels = ['5 зірок', '4 зірки', '3 зірки', '2 зірки', '1 зірка'];

  // @ts-ignore
  @Input() diagramData: DiagramColumnsStatisticsData;


  @Input() type: 'month' | 'year' | 'last' | 'all' = 'last';

  @Input() advertisementId = 0;
  // @ts-ignore
  @Input() date: string;

  @Input() columnColor = '#0e4e6a';
  @Input() columnsHeight = '700px';

  constructor(private dateService: DateService, private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  getYearByCreationDate(): number {
    return +this.date.substr(6, 4);
  }

  getLabelByType(): string {
    switch (this.type) {
      case 'last':
        return 'Статистика за останні 30 днів';
      case 'all':
        return 'Статистика за весь час';
      case 'month':
        return 'Статистика за місяць';
      case 'year':
        return 'Статистика за рік';
    }
  }

  loadData(): void {
    switch (this.type) {
      case 'last':
        this.statisticsService.getAdvertisementFeedbacksStatisticsByLast30Days(this.advertisementId).subscribe((response) => {
          this.diagramData = response;
        });
        break;
      case 'all':
        this.statisticsService.getAdvertisementFeedbacksStatistics(this.advertisementId).subscribe((response) => {
          this.diagramData = response;
        });
        break;
      case 'month':
        this.statisticsService.getAdvertisementFeedbacksStatisticsByMonthAndYear(
          this.advertisementId, new Date().getMonth() + 1, new Date().getFullYear()
        ).subscribe((response) => {
          this.diagramData = response;
        });
        break;
      case 'year':
        this.statisticsService.getAdvertisementFeedbacksStatisticsByYear(
          this.advertisementId, new Date().getFullYear()
        ).subscribe((response) => {
          this.diagramData = response;
        });
        break;
    }
  }

  getDataForYearMonthPicker(): MonthDayYear {
    const date = new MonthDayYear();
    date.createFromQuery(this.date);
    return date;
  }

  changedDateMonth(date: MonthDayYear): void {
    this.statisticsService.getAdvertisementFeedbacksStatisticsByMonthAndYear(this.advertisementId, date.month, date.year).subscribe((r) => {
      this.diagramData = r;
    });
  }

  changedYear(year: number): void {
    this.statisticsService.getAdvertisementFeedbacksStatisticsByYear(
      this.advertisementId, year
    ).subscribe((response) => {
      this.diagramData = response;
    });
  }
}
