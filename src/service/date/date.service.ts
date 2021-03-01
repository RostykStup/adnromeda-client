import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor(private httpClient: HttpClient) {
  }

  getUkrMonthNameByNumber(num: number): string {
    switch (num) {
      case 0: return 'Січень';
      case 1: return 'Лютий';
      case 2: return 'Березень';
      case 3: return 'Квітень';
      case 4: return 'Травень';
      case 5: return 'Червень';
      case 6: return 'Липень';
      case 7: return 'Серпень';
      case 8: return 'Вересень';
      case 9: return 'Жовтень';
      case 10: return 'Листопад';
      case 11: return 'Грудень';
      default: return '---';
    }
  }

  getDateString(date: Date): string {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) {
      // @ts-ignore
      dd = '0' + dd;
    }
    if (mm < 10) {
      // @ts-ignore
      mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
  }

}
