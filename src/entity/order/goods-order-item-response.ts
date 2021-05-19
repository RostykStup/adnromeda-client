import {DeliveryTypeResponse} from '../country/delivery-type-response';
import {ParametersValuesPriceCountResponse} from '../advertisement/goodsAdvertisement/parameter/parameters-values-price-count-response';

export class GoodsOrderItemResponse {
  id = 0;
  count = 0;
  status = '';
  advertisementId = 0;
  image = '';
  title = '';
  price = 0;

  priceCountResponse = new ParametersValuesPriceCountResponse();
}
