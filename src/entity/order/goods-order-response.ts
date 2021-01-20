import {GoodsOrderItemResponse} from './goods-order-item-response';
import {GoodsOrderDeliveryDetailsResponse} from './goods-order-delivery-details-response';

export class GoodsOrderResponse {
  id = 0;

  creationDate = '';

  closingDate = '';

  orderStatus = '';

  isViewed = false;

  price = 0;

  items = new Array<GoodsOrderItemResponse>();

  deliveryDetails = new GoodsOrderDeliveryDetailsResponse();

  seller = '';
  sellerId = 0;
}
