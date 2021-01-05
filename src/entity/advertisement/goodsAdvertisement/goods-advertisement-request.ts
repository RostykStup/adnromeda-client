import {AdvertisementRequest} from '../advertisement-request';
import {PropertyRequest} from './property-request';

export class GoodsAdvertisementRequest extends AdvertisementRequest {

  onlySellerCountry: boolean | any;

  subcategoryId: number | any;

  currencyId: number | any;

  count: number | any = '';

  images: Array<string> | any;

  properties: Array<PropertyRequest> = [];

  deliveryTypes: Array<number> | any = [];

  constructor() {
    super();
    this.count = null;
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
