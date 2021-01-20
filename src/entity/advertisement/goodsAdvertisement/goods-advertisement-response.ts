import {AdvertisementResponse} from '../advertisement-response';
import {PropertyResponse} from './property-response';
import {SubcategoryResponse} from '../../category/subcategory-response';
import {CurrencyResponse} from '../../country/currency-response';

export class GoodsAdvertisementResponse extends AdvertisementResponse {

  onlySellerCountry = false;

  subcategory = new SubcategoryResponse();

  images = Array<string>();

  properties = Array<PropertyResponse>();

  currency = new CurrencyResponse();

  count = 0;

  seller = '';

  sellerId = 0;

}
