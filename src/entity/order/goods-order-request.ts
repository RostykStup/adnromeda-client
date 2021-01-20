import {GoodsOrderItemRequest} from './goods-order-item-request';

export class GoodsOrderRequest {
  items = new Array<GoodsOrderItemRequest>();
  addressId = 0;
}
