export class GoodsSellerDataRequest {
  onlySellerCountryDelivery: boolean;
  countryCodes: Array<string>;
  deliveryTypesId: Array<number>;


  constructor() {
    this.onlySellerCountryDelivery = false;
    this.countryCodes = [];
    this.deliveryTypesId = [];
  }
}
