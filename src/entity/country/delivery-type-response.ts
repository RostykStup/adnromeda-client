export class DeliveryTypeResponse {
  id: number;
  title: string;
  isInternational: boolean;
  countryCode: string;
  checked = true;
  cashOnDelivery = false;

  constructor() {
    this.id = -1;
    this.title = '';
    this.isInternational = false;
    this.countryCode = '';
  }
}
