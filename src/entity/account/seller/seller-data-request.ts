import {AccountDataRequest} from '../account-data-request';

export class SellerDataRequest {

  taxpayerNumber: string;
  shopName: string;


  constructor() {
    this.taxpayerNumber = '';
    this.shopName = '';
  }
}
