export class GoodsSellerDataRequest {
  onlySellerCountryDelivery: boolean;
  countryCodes: Array<string>;
  deliveryTypesId: Array<number>;

  shopName: string | null = null;
  
  avatar: string | null = null;

  sendNewOrderNotifications: boolean | null = null;

  sendOrderReceivedNotifications: boolean | null = null;

  constructor() {
    this.onlySellerCountryDelivery = false;
    this.countryCodes = [];
    this.deliveryTypesId = [];
  }
}
