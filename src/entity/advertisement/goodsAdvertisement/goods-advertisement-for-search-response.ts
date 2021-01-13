import {CurrencyResponse} from '../../country/currency-response';

export class GoodsAdvertisementForSearchResponse {
  id = 0;
  title = '';
  image = '';
  type = '';
  seller = '';
  sellerId = 0;
  sold: number | null = null;

  price = 0;
  priceMin = 0;
  priceMax = 0;

  priceWithUserCurrency = '';

  date = '';
  rating: number | null = null;

}
