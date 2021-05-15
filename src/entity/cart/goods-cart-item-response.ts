import {DeliveryTypeResponse} from '../country/delivery-type-response';
import {ParametersValuesPriceCountResponse} from '../advertisement/goodsAdvertisement/parameter/parameters-values-price-count-response';

export class GoodsCartItemResponse {

  id = 0;
  image: string | null = null;
  title = '';
  deliveryName = '';
  deliveryId = 0;
  count = 0;
  sellerId = 0;
  advertisementId = 0;
  description = '';
  priceCountResponse = new ParametersValuesPriceCountResponse();

}
