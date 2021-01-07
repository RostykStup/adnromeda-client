import {GoodsAdvertisementResponse} from '../goods-advertisement-response';
import {WholesalePriceResponse} from './wholesale-price-response';

export class WholesaleGoodsAdvertisementResponse extends GoodsAdvertisementResponse {
  price = new WholesalePriceResponse();
}
