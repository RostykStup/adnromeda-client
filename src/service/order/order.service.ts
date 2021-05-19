import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../common/global-constants';
import {GoodsOrderRequest} from '../../entity/order/goods-order-request';
import {PaginationRequest} from '../../entity/pagination-request';
import {GoodsOrderResponse} from '../../entity/order/goods-order-response';
import {GoodsOrderDeliveryDetailsResponse} from '../../entity/order/goods-order-delivery-details-response';
import {GoodsOrderDeliveryDetailsForShipmentRequest} from '../../entity/order/goods-order-delivery-details-for-shipment-request';
import {ConfirmGoodsOrderDeliveryRequest} from '../../entity/order/confirm/confirm-goods-order-delivery-request';
import {UserGoodsOrderDataResponse} from '../../entity/order/user-goods-order-data-response';
import Global = WebAssembly.Global;
import {SellerGoodsOrderDataResponse} from '../../entity/order/seller-goods-order-data-response';
import {PaginationResponse} from '../../entity/pagination-response';
import {NavigationService} from '../../common/navigation.service';
import {GoodsOrderSellerConfirmRequest} from '../../entity/order/confirm/goods-order-seller-confirm-request';


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

  exchangeItemPrice(id: number, currency: string): Observable<number> {
    const url = this.orderURL + '/exchange?id=' + id + '&currency=' + currency;
    return this.httpClient.get<number>(url);
  }

  confirmOrderBySeller(id: number, request: GoodsOrderSellerConfirmRequest): Observable<any> {
    const url = this.orderURL + '/confirm?id=' + id;
    return this.httpClient.put(url, request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
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

  getUserOrdersPageByStatuses(pagination: PaginationRequest, statuses: Array<string>): Observable<PaginationResponse<GoodsOrderResponse>> {
    const url = this.orderURL + '/user?' + NavigationService.convertPaginationRequestToParamsQuery(pagination)
      + (statuses.length > 0 ? '&status=' + statuses.join('&status=') : '');
    return this.httpClient.get<PaginationResponse<GoodsOrderResponse>>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
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

  confirmGoodsOrderDelivery(id: number): Observable<any> {
    const url = this.orderURL + '/confirm-delivery?id=' + id;
    return this.httpClient.put(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  confirmGoodsOrderPayment(id: number): Observable<any> {
    const url = this.orderURL + '/confirm-payment?id=' + id;
    return this.httpClient.put(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  confirmGoodsOrderPaymentFromSeller(id: number): Observable<any> {
    const url = this.orderURL + '/confirm-payment-seller?id=' + id;
    return this.httpClient.put(url, null, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getUserGoodsOrderData(): Observable<UserGoodsOrderDataResponse> {
    const url = this.orderURL + '/user/data';
    return this.httpClient.get<UserGoodsOrderDataResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getSellerGoodsOrderData(): Observable<SellerGoodsOrderDataResponse> {
    const url = this.orderURL + '/seller/data';
    return this.httpClient.get<SellerGoodsOrderDataResponse>(url, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  confirmGoodsOrderSending(id: number, request: GoodsOrderDeliveryDetailsForShipmentRequest): Observable<any> {
    const url = this.orderURL + '/shipment?id=' + id;
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
        return 'Запитує скасування';
      case 'CLOSED' :
        return 'Завершено';
      case 'WAITING_FOR_SELLER_CONFIRMATION' :
        return 'Підтвердіть замовлення';
      case 'WAITING_FOR_USER_PAYMENT' :
        return 'Очікує оплату';
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

  getPaymentUrkValue(payment: 'AGREEMENT' | 'CASH_ON_DELIVERY' | 'PREPAYMENT'): string {
    switch (payment) {
      case 'AGREEMENT':
        return 'За домовленістю';
      case 'CASH_ON_DELIVERY':
        return 'Накладений платіж';
      case 'PREPAYMENT':
        return 'Передплата';
    }
    return 'error';
  }

  getUkrOrderStatusForUserValue(orderStatus: string): string {
    switch (orderStatus) {
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
        return 'Ви запитуєте скасування';
      case 'CLOSED' :
        return 'Завершено';
      case 'WAITING_FOR_SELLER_CONFIRMATION' :
        return 'Очікує підтвердження продавця';
      case 'WAITING_FOR_USER_PAYMENT' :
        return 'Оплатіть товар';
      default :
        return '';
    }
  }
}
