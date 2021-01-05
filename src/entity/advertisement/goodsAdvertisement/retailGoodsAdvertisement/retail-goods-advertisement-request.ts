import {GoodsAdvertisementRequest} from '../goods-advertisement-request';
import {RetailPriceRequest} from './retail-price-request';

export class RetailGoodsAdvertisementRequest extends GoodsAdvertisementRequest {
  price: RetailPriceRequest;

  constructor() {
    super();
    this.price = new RetailPriceRequest();
  }
}
