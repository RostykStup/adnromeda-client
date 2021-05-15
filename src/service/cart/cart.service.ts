import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {CartResponse} from '../../entity/cart/cart-response';
import {GoodsCartItemForCountingPriceRequest} from '../../entity/cart/goods-cart-item-for-counting-price-request';
import {ChangeGoodsCartItemCountResponse} from '../../entity/cart/change-goods-cart-item-count-response';
import {CartSellerPositionResponse} from '../../entity/cart/cart-seller-position-response';
import {GoodsCartItemResponse} from '../../entity/cart/goods-cart-item-response';
import {NavigationService} from '../../common/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpClient: HttpClient, private navigationService: NavigationService) {
  }

  cartURL = GlobalConstants.API_URL + 'cart';

  addItemToCart(advertisementId: number, deliveryTypeId: number, paramsValuesId: number): Observable<any> {
    const url = this.cartURL + '?id=' + advertisementId + '&deliveryId=' + deliveryTypeId + '&paramsValuesId=' + paramsValuesId;
    return this.httpClient.post(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getUserCart(): Observable<CartResponse> {
    return this.httpClient.get<CartResponse>(this.cartURL, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getItemsPrice(items: Array<GoodsCartItemForCountingPriceRequest>): Observable<number> {
    const url = this.cartURL + '/price';
    return this.httpClient.put<number>(url, items);
  }

  updateGoodsCartItemCount(cartItemId: number, count: number): Observable<ChangeGoodsCartItemCountResponse> {
    const url = this.cartURL + '?count=' + count + '&id=' + cartItemId;
    return this.httpClient.put<ChangeGoodsCartItemCountResponse>(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  checkGoodsCartItemCount(cartItemId: number, count: number): Observable<ChangeGoodsCartItemCountResponse> {
    const url = this.cartURL + '/check?count=' + count + '&id=' + cartItemId;
    return this.httpClient.put<ChangeGoodsCartItemCountResponse>(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  deleteItemFromCart(id: number): Observable<any> {
    const url = this.cartURL + '?id=' + id;
    return this.httpClient.delete(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getItemsForOrder(ids: Array<number>): Observable<Array<CartSellerPositionResponse>> {
    let url = this.cartURL + '/items?';
    ids.forEach(id => {
      url = url + '&id=' + id;
    });
    return this.httpClient.get<Array<CartSellerPositionResponse>>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  exchangeSellerPositionCurrency(currency: string, ids: Array<number>): Observable<CartSellerPositionResponse> {
    const url = this.cartURL + '/exchange?currency=' + currency + '&ids=' + ids.join('&ids=');
    return this.httpClient.get<CartSellerPositionResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }
}
