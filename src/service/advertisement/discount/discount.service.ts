import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../../common/global-constants';
import {ParametersValuesPriceCountResponse} from '../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-response';
import {DiscountsForParametersValuesPriceCountResponse} from './discounts-for-parameters-values-price-count-response';
import {DiscountResponse} from '../../../entity/advertisement/goodsAdvertisement/discount/discount-response';
import {DiscountRequest} from '../../../entity/advertisement/goodsAdvertisement/discount/discount-request';
import {CheckDiscountCreatingResponse} from '../../../entity/advertisement/goodsAdvertisement/discount/check-discount-creating-response';


@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  constructor(private httpClient: HttpClient) {
  }

  discountURL = GlobalConstants.API_URL + 'discount';

  getParametersValuesPriceCountsWithDiscount(id: number): Observable<Array<DiscountsForParametersValuesPriceCountResponse>> {
    const url = this.discountURL + '/parameters?id=' + id;
    return this.httpClient.get<Array<DiscountsForParametersValuesPriceCountResponse>>(url);
  }

  getPriceByDiscount(discount: DiscountResponse, price: number): number {
    if (discount.discountType === 'DISCOUNT_NEW_PRICE') {
      return discount.discountValue;
    } else {
      return Math.round(price * (100.0 - discount.discountValue)) / 100.0;
    }
  }

  getPriceByDiscountRequest(discount: DiscountRequest, price: number): number {
    if (discount.discountType === 'DISCOUNT_NEW_PRICE') {
      return discount.discountValue;
    } else {
      return Math.round(price * (100.0 - discount.discountValue)) / 100.0;
    }
  }

  createDiscount(discount: DiscountRequest): Observable<any> {
    return this.httpClient.post(this.discountURL, discount);
  }

  checkCanCreateDiscount(discount: DiscountRequest): Observable<CheckDiscountCreatingResponse> {
    const url = this.discountURL + '/check';
    return this.httpClient.put<CheckDiscountCreatingResponse>(url, discount);
  }

  closeDiscount(id: number): Observable<boolean> {
    const url = this.discountURL + '/close?id=' + id;
    return this.httpClient.put<boolean>(url, null);
  }

  deleteDiscount(id: number): Observable<any> {
    const url = this.discountURL + '?id=' + id;
    return this.httpClient.delete(url);
  }
}
