import {GoodsCartItemResponse} from './goods-cart-item-response';

export class CartSellerPositionResponse{
  items = new Array<GoodsCartItemResponse>();
  sellerId = 0;
  sellerName = '';
  sellerCheck = false;
  sellerCountry = '';
}
