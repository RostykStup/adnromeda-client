import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {WholesaleGoodsAdvertisementRequest} from '../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-goods-advertisement-request';
import {RetailGoodsAdvertisementRequest} from '../../entity/advertisement/goodsAdvertisement/retailGoodsAdvertisement/retail-goods-advertisement-request';
import {GoodsAdvertisementSearchRequest} from '../../entity/advertisement/goodsAdvertisement/goods-advertisement-search-request';
import {PaginationRequest} from '../../entity/pagination-request';
import {PaginationResponse} from '../../entity/pagination-response';
import {GoodsAdvertisementResponse} from '../../entity/advertisement/goodsAdvertisement/goods-advertisement-response';
import {WholesaleGoodsAdvertisementResponse} from '../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-goods-advertisement-response';
import {RetailGoodsAdvertisementResponse} from '../../entity/advertisement/goodsAdvertisement/retailGoodsAdvertisement/retail-goods-advertisement-response';
import {RetailPriceRequest} from '../../entity/advertisement/goodsAdvertisement/retailGoodsAdvertisement/retail-price-request';
import {WholesalePriceRequest} from '../../entity/advertisement/goodsAdvertisement/wholesaleGoodsAdvertisement/wholesale-price-request';
import {PropertyRequest} from '../../entity/advertisement/goodsAdvertisement/property-request';
import {GoodsAdvertisementStatisticsResponse} from '../../entity/statistics/advertisement/GoodsAdvertisementStatisticsResponse';

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
