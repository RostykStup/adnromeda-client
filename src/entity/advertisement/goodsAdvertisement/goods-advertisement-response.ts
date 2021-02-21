import {AdvertisementResponse} from '../advertisement-response';
import {PropertyResponse} from './property-response';
import {SubcategoryResponse} from '../../category/subcategory-response';
import {CurrencyResponse} from '../../country/currency-response';
import {ParametersValuesPriceCountResponse} from './parameter/parameters-values-price-count-response';
import {ParameterResponse} from './parameter/parameter-response';

export class GoodsAdvertisementResponse extends AdvertisementResponse {

  onlySellerCountry = false;

  subcategory = new SubcategoryResponse();

  images = Array<string>();

  properties = Array<PropertyResponse>();

  currency = new CurrencyResponse();

  totalCount = 0;

  seller = '';

  sellerId = 0;

  countryCode = '';

  isInFavorites = false;

  parameters = new Array<ParameterResponse>();

  minPrice = 0;

  maxPrice = 0;

  valuesPriceCounts = new Array<ParametersValuesPriceCountResponse>();

  hasParameters = false;

}
