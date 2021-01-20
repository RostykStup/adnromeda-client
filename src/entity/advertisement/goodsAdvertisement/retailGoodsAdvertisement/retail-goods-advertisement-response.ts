import {GoodsAdvertisementResponse} from '../goods-advertisement-response';
import {RetailPriceResponse} from './retail-price-response';

export class RetailGoodsAdvertisementResponse extends GoodsAdvertisementResponse {
  price = new RetailPriceResponse();
}
