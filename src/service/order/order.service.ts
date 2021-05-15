import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {GoodsOrderRequest} from '../../entity/order/goods-order-request';
import {PaginationRequest} from '../../entity/pagination-request';
import {GoodsOrderResponse} from '../../entity/order/goods-order-response';
import {GoodsOrderDeliveryDetailsResponse} from '../../entity/order/goods-order-delivery-details-response';
import {GoodsOrderDeliveryDetailsForShipmentRequest} from '../../entity/order/goods-order-delivery-details-for-shipment-request';
import {ConfirmGoodsOrderDeliveryRequest} from '../../entity/order/confirm-goods-order-delivery-request';
import {UserGoodsOrderDataResponse} from '../../entity/order/user-goods-order-data-response';
import Global = WebAssembly.Global;
import {SellerGoodsOrderDataResponse} from '../../entity/order/seller-goods-order-data-response';
import {PaginationResponse} from '../../entity/pagination-response';
import {NavigationService} from '../../common/navigation.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private httpClient: HttpClient, private navigationService: NavigationService) {
  }

  orderURL = GlobalConstants.API_URL + 'goods-order';

  createOrder(request: GoodsOrderRequest): Observable<any> {

    return this.httpClient.post(this.orderURL, request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getSellerWaitingShipmentOrdersPage(request: PaginationRequest): Observable<any> {
    // ?direction=DESC&field=creationDate&page=0&size=10
    const url = this.orderURL + '/seller/shipment?direction=' + request.direction
      + '&field=' + request.field
      + '&page=' + request.page
      + '&size=' + request.size;
    return this.httpClient.get(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getSellerOrdersPageByStatuses(pagination: PaginationRequest, statuses: Array<string>): Observable<PaginationResponse<GoodsOrderResponse>> {
    const url = this.orderURL + '/seller?' + NavigationService.convertPaginationRequestToParamsQuery(pagination)
      + (statuses.length > 0 ? '&status=' + statuses.join('&status=') : '');
    return this.httpClient.get<PaginationResponse<GoodsOrderResponse>>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getUserWaitingShipmentOrdersPage(request: PaginationRequest): Observable<any> {
    // ?direction=DESC&field=creationDate&page=0&size=10
    const url = this.orderURL + '/user/shipment?direction=' + request.direction
      + '&field=' + request.field
      + '&page=' + request.page
      + '&size=' + request.size;
    return this.httpClient.get(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getUserWaitingDeliveryOrdersPage(request: PaginationRequest): Observable<any> {
    // ?direction=DESC&field=creationDate&page=0&size=10
    const url = this.orderURL + '/user/delivery?direction=' + request.direction
      + '&field=' + request.field
      + '&page=' + request.page
      + '&size=' + request.size;
    return this.httpClient.get(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getSellerWaitingDeliveryOrdersPage(request: PaginationRequest): Observable<any> {
    // ?direction=DESC&field=creationDate&page=0&size=10
    const url = this.orderURL + '/seller/delivery?direction=' + request.direction
      + '&field=' + request.field
      + '&page=' + request.page
      + '&size=' + request.size;
    return this.httpClient.get(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getUserClosedOrdersPage(request: PaginationRequest): Observable<any> {
    // ?direction=DESC&field=creationDate&page=0&size=10
    const url = this.orderURL + '/user/closed?direction=' + request.direction
      + '&field=' + request.field
      + '&page=' + request.page
      + '&size=' + request.size;
    return this.httpClient.get(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getSellerClosedOrdersPage(request: PaginationRequest): Observable<any> {
    // ?direction=DESC&field=creationDate&page=0&size=10
    const url = this.orderURL + '/seller/closed?direction=' + request.direction
      + '&field=' + request.field
      + '&page=' + request.page
      + '&size=' + request.size;
    return this.httpClient.get(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getSellerNewOrdersPage(request: PaginationRequest): Observable<any> {
    // ?direction=DESC&field=creationDate&page=0&size=10
    const url = this.orderURL + '/seller/new?direction=' + request.direction
      + '&field=' + request.field
      + '&page=' + request.page
      + '&size=' + request.size;
    return this.httpClient.get(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getSellerAllOrdersPage(request: PaginationRequest): Observable<any> {
    // ?direction=DESC&field=creationDate&page=0&size=10
    const url = this.orderURL + '/seller/all?direction=' + request.direction
      + '&field=' + request.field
      + '&page=' + request.page
      + '&size=' + request.size;
    return this.httpClient.get(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  confirmGoodsOrderDelivery(request: ConfirmGoodsOrderDeliveryRequest): Observable<any> {
    const url = this.orderURL + '/confirm';
    return this.httpClient.put(url, request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getUserAllOrdersPage(request: PaginationRequest): Observable<any> {
    // ?direction=DESC&field=creationDate&page=0&size=10
    const url = this.orderURL + '/user/all?direction=' + request.direction
      + '&field=' + request.field
      + '&page=' + request.page
      + '&size=' + request.size;
    return this.httpClient.get(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getUserGoodsOrderData(): Observable<UserGoodsOrderDataResponse> {
    const url = this.orderURL + '/user/data';
    return this.httpClient.get<UserGoodsOrderDataResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getSellerGoodsOrderData(): Observable<SellerGoodsOrderDataResponse> {
    const url = this.orderURL + '/seller/data';
    return this.httpClient.get<SellerGoodsOrderDataResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  confirmGoodsOrderSending(request: GoodsOrderDeliveryDetailsForShipmentRequest): Observable<any> {
    const url = this.orderURL + '/shipment';
    return this.httpClient.put(url, request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  confirmGoodsOrderView(id: number): Observable<any> {
    const url = this.orderURL + '/view?id=' + id;
    return this.httpClient.put(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getGoodsOrderByIdAndSeller(id: number): Observable<GoodsOrderResponse> {
    const url = this.orderURL + '/seller/order?id=' + id;
    return this.httpClient.get<GoodsOrderResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getGoodsOrderByIdAndUser(id: number): Observable<GoodsOrderResponse> {
    const url = this.orderURL + '/user/order?id=' + id;
    return this.httpClient.get<GoodsOrderResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }


  getUkrOrderStatusValue(status: string): string {
    switch (status) {
      case 'WAITING_FOR_PAYMENT_VERIFY' :
        return 'Очікує підтвердження оплати';
      case 'WAITING_FOR_SENDING' :
        return 'Очікує відправки';
      case 'WAITING_FOR_DELIVERY' :
        return 'Відправлено';
      case 'WAITING_FOR_FEEDBACK' :
        return 'Завершено';
      case 'CANCELLED' :
        return 'Скасовано';
      case 'WAITING_FOR_SELLER_CANCEL_CONFIRMATION' :
        return 'Очікує підтвердження продавця';
      case 'CLOSED' :
        return 'Завершено';
      default :
        return '';
    }
  }


  getUkrOrderItemStatusValue(status: string): string {
    switch (status) {
      case 'WAITING_FOR_SENDING' :
        return 'Очікує на відправку';
      case 'WAITING_FOR_DELIVERY' :
        return 'Відправлено';
      case 'WAITING_FOR_FEEDBACK' :
        return 'Отримання підтверджено';

      default :
        return '';
    }

  }
}
