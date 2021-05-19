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
import {GoodsSellerFeedbackRequest} from '../../entity/feedback/goods-seller-feedback-request';
import {GoodsAdvertisementFeedbackRequest} from '../../entity/feedback/goods-advertisement-feedback-request';
import {PaginationResponse} from '../../entity/pagination-response';
import {GoodsAdvertisementFeedbackResponse} from '../../entity/feedback/goods-advertisement-feedback-response';
import {NavigationService} from '../../common/navigation.service';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private httpClient: HttpClient, private navigationService: NavigationService) {
  }

  feedbackURL = GlobalConstants.API_URL + 'feedback';

  createGoodsSellerFeedback(request: GoodsSellerFeedbackRequest): Observable<any> {
    const url = this.feedbackURL + '/goods-seller';
    return this.httpClient.post(url, request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  createGoodsAdvertisementFeedback(request: GoodsAdvertisementFeedbackRequest): Observable<any> {
    const url = this.feedbackURL + '/goods-advertisement';
    return this.httpClient.post(url, request, {headers: this.navigationService.getCurrentRequestAuthorizationHeader()});
  }

  getFeedbacksPageForAdvertisement(id: number, request: PaginationRequest): Observable<PaginationResponse<GoodsAdvertisementFeedbackResponse>> {
    const url = this.feedbackURL + '?id=' + id
      + '&direction=' + request.direction
      + '&field=' + request.field
      + '&page=' + request.page
      + '&size=' + request.size;

    return this.httpClient.get<PaginationResponse<GoodsAdvertisementFeedbackResponse>>(url);
  }

  getFeedbackImage(userId: number, name: string): string {
    // return imageName !== null && imageName !== '' ? GlobalConstants.API_URL + 'image/user_' + sellerId + '/advertisements/' + imageName : 'https://sunliberty.com.ua/wp-content/themes/brixel/images/No-Image-Found-400x264.png';
    return GlobalConstants.API_URL + 'image/user_' + userId + '/feedback/' + name;
  }
}
