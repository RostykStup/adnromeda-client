import {DeliveryTypeResponse} from '../country/delivery-type-response';

export class GoodsOrderDeliveryDetailsResponse {
  id = 0;
  countryCode = '';
  recipient = '';
  phoneNumber = '';
  region = '';
  city = '';
  street = '';
  house = '';
  trackingNumber = '';
  shipment = '';
  sellerMessage = '';
  // @ts-ignore
  delivery: DeliveryTypeResponse;
}
