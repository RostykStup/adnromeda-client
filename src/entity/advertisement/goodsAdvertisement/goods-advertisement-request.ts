import {AdvertisementRequest} from '../advertisement-request';
import {PropertyRequest} from './property-request';

export class GoodsAdvertisementRequest extends AdvertisementRequest {

  onlySellerCountry = false;

  subcategoryId: number | any;

  currencyId: number | any;

  count: number | any = '';

  images = Array<string>();

  properties: Array<PropertyRequest> | any;

  deliveryTypes: Array<number> | any = [];

  constructor() {
    super();
    this.count = null;
    this.properties = Array<PropertyRequest>();
  }

  loadDataFromGoodsAdvertisementRequest(advertisement: GoodsAdvertisementRequest): void {
    this.onlySellerCountry = advertisement.onlySellerCountry;
    this.subcategoryId = advertisement.subcategoryId;
    this.currencyId = advertisement.currencyId;
    this.count = advertisement.count;
    this.images = advertisement.images;
    this.properties = advertisement.properties;
    this.deliveryTypes = advertisement.deliveryTypes;

    this.title = advertisement.title;
    this.description = advertisement.description;
    this.mainImage = advertisement.mainImage;
  }

}
