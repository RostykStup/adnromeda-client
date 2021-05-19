import {GoodsOrderItemResponse} from './goods-order-item-response';
import {GoodsOrderDeliveryDetailsResponse} from './goods-order-delivery-details-response';
import {GoodsOrderPaymentDetailsResponse} from './goods-order-payment-details-response';
import {GoodsOrderSellerChangeResponse} from './change/goods-order-seller-change-response';

export class GoodsOrderResponse {
  id = 0;
  creationDate = '';
  closingDate = '';
  orderStatus = '';
  isViewed = false;
  price = 0;
  items = new Array<GoodsOrderItemResponse>();
  changes = new Array<GoodsOrderSellerChangeResponse>();
  deliveryDetails = new GoodsOrderDeliveryDetailsResponse();
  paymentDetails = new GoodsOrderPaymentDetailsResponse();
  seller = '';
  sellerId = 0;
  chatId = 0;
}
