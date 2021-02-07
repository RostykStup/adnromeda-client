import {AdvertisementRequest} from '../advertisement-request';
import {PropertyRequest} from './property-request';
import {ParameterRequest} from './parameter/parameter-request';
import {ParametersValuesPriceCountRequest} from './parameter/parameters-values-price-count-request';

export class GoodsAdvertisementRequest extends AdvertisementRequest {

  onlySellerCountry = false;

  subcategoryId: number | any;

  parameters = new Array<ParameterRequest>();

  valuesPriceCounts = new Array<ParametersValuesPriceCountRequest>();

  images = Array<string>();

  properties = new Array<PropertyRequest>();

  deliveryTypes: Array<number> | any = [];


  // loadDataFromGoodsAdvertisementRequest(advertisement: GoodsAdvertisementRequest): void {
  //   this.onlySellerCountry = advertisement.onlySellerCountry;
  //   this.subcategoryId = advertisement.subcategoryId;
  //   this.currencyId = advertisement.currencyId;
  //   this.count = advertisement.count;
  //   this.images = advertisement.images;
  //   this.properties = advertisement.properties;
  //   this.deliveryTypes = advertisement.deliveryTypes;
  //
  //   this.title = advertisement.title;
  //   this.description = advertisement.description;
  //   this.mainImage = advertisement.mainImage;
  // }

}
