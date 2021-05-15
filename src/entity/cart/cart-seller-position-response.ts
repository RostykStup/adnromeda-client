import {GoodsCartItemResponse} from './goods-cart-item-response';
import {CurrencyResponse} from '../country/currency-response';

export class CartSellerPositionResponse{
  items = new Array<GoodsCartItemResponse>();
  sellerId = 0;
  sellerName = '';
  sellerCountry = '';
  currencyResponse = new CurrencyResponse();
}
