import {GoodsOrderItemRequest} from './goods-order-item-request';
import {GoodsOrderPaymentRequest} from './goods-order-payment-request';

export class GoodsOrderRequest {
  items = new Array<GoodsOrderItemRequest>();
  addressId = 0;
  delivery  = 1;
  payment = new GoodsOrderPaymentRequest();
  sum = 0;
}
