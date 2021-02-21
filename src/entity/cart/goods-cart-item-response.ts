import {DeliveryTypeResponse} from '../country/delivery-type-response';
import {ParametersValuesPriceCountResponse} from '../advertisement/goodsAdvertisement/parameter/parameters-values-price-count-response';

export class GoodsCartItemResponse {

  id = 0;
  image: string | null = null;
  title = '';
  deliveryType = new DeliveryTypeResponse();
  count = 0;
  sellerId = 0;
  advertisementId = 0;;
  checked = false;
  description = '';
  priceCountResponse = new ParametersValuesPriceCountResponse();

}
