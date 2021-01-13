import {GoodsCartItemResponse} from './goods-cart-item-response';

export class GoodsCartItemForCountingPriceRequest{
  advertisementId: number;
  count: number;


  constructor(item: GoodsCartItemResponse) {
    this.advertisementId = item.advertisementId;
    this.count = item.count;
  }
}
