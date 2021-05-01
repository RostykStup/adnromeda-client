import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {Observable} from 'rxjs';
import {DiagramColumnsStatisticsData} from '../../entity/statistics/advertisement/orders/diagram-columns-statistics-data';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private httpClient: HttpClient) {
  }

  statisticsURL = GlobalConstants.API_URL + 'statistics';

  getAdvertisementOrdersDataByYear(year: number, id: number): Observable<DiagramColumnsStatisticsData> {
    const url = this.statisticsURL + '/year-orders?id=' + id + '&year=' + year;
    return this.httpClient.get<DiagramColumnsStatisticsData>(url);
  }

  getAdvertisementViewsDataByYear(year: number, id: number): Observable<DiagramColumnsStatisticsData> {
    const url = this.statisticsURL + '/year-views?id=' + id + '&year=' + year;
    return this.httpClient.get<DiagramColumnsStatisticsData>(url);
  }

  getAdvertisementFeedbacksStatisticsByLast30Days(id: number): Observable<DiagramColumnsStatisticsData> {
    const url = this.statisticsURL + '/feedbacks-last-month?id=' + id;
    return this.httpClient.get<DiagramColumnsStatisticsData>(url);
  }

  getAdvertisementFeedbacksStatisticsByMonthAndYear(id: number, month: number, year: number): Observable<DiagramColumnsStatisticsData> {
    const url = this.statisticsURL + '/feedbacks-month?id=' + id + '&month=' + month + '&year=' + year;
    return this.httpClient.get<DiagramColumnsStatisticsData>(url);
  }

  getAdvertisementFeedbacksStatisticsByYear(id: number, year: number): Observable<DiagramColumnsStatisticsData> {
    const url = this.statisticsURL + '/feedbacks-year?id=' + id + '&year=' + year;
    return this.httpClient.get<DiagramColumnsStatisticsData>(url);
  }

  getAdvertisementFeedbacksStatistics(id: number): Observable<DiagramColumnsStatisticsData> {
    const url = this.statisticsURL + '/feedbacks-all?id=' + id;
    return this.httpClient.get<DiagramColumnsStatisticsData>(url);
  }


  getAdvertisementCreationDate(id: number): Observable<string> {
    const url = this.statisticsURL + '/advertisement-date?id=' + id;
    return this.httpClient.get<string>(url);
  }

}
