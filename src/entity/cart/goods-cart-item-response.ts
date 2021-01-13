import {DeliveryTypeResponse} from '../country/delivery-type-response';

export class GoodsCartItemResponse {

  id = 0;
  image: string | null = null;
  title = '';
  deliveryType = new DeliveryTypeResponse();
  price = 0.0;
  count = 0;
  sellerId = 0;
  advertisementId = 0;
  max = 0;
  checked = false;

}
