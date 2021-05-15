import {CurrencyResponse} from '../../country/currency-response';

export class GoodsAdvertisementForSearchResponse {
  id = 0;
  title = '';
  image = '';
  seller = '';
  sellerId = 0;
  sold: number | null = null;
  minPrice = 0;
  maxPrice = 0;
  minPriceWithDiscount = 0;
  maxPriceWithDiscount = 0;
  isInFavorites = false;

  currencyCode = 'USD';

  hasDiscount = false;

  date = '';
  rating: number | null = null;

}
