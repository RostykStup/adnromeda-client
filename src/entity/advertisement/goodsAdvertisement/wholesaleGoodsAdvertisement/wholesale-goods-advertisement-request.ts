import {GoodsAdvertisementRequest} from '../goods-advertisement-request';
import {WholesalePriceRequest} from './wholesale-price-request';

export class WholesaleGoodsAdvertisementRequest extends GoodsAdvertisementRequest {
  price: WholesalePriceRequest;


  constructor() {
    super();
    this.price = new WholesalePriceRequest();
  }
}
