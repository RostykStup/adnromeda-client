import {ParametersValuesPriceCountResponse} from '../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-response';
import {DiscountResponse} from '../../../entity/advertisement/goodsAdvertisement/discount/discount-response';

export class DiscountsForParametersValuesPriceCountResponse {
  priceCountResponse = new ParametersValuesPriceCountResponse();
  discounts = new Array<DiscountResponse>();
}
