import {DeliveryTypeResponse} from '../country/delivery-type-response';

export class GoodsOrderItemResponse {
  id = 0;
  count = 0;
  status = '';
  advertisementId = 0;
  description = 0;
  delivery = new DeliveryTypeResponse();
  image = '';
  title = '';
  price = 0;
  checked = false;
}
