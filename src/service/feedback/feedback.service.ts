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
import {GoodsSellerFeedbackRequest} from '../../entity/feedback/goods-seller-feedback-request';
import {GoodsAdvertisementFeedbackRequest} from '../../entity/feedback/goods-advertisement-feedback-request';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private httpClient: HttpClient) {
  }

  feedback = GlobalConstants.API_URL + 'feedback';

  createGoodsSellerFeedback(request: GoodsSellerFeedbackRequest): Observable<any> {
    const url = this.feedback + '/goods-seller';
    return this.httpClient.post(url, request, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }

  createGoodsAdvertisementFeedback(request: GoodsAdvertisementFeedbackRequest): Observable<any> {
    const url = this.feedback + '/goods-advertisement';
    return this.httpClient.post(url, request, {headers: GlobalConstants.getRequestAuthorizationHeader()});
  }
}
