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

  isInFavorites = false;

  date = '';
  rating: number | null = null;

}
