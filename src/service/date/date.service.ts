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

}
