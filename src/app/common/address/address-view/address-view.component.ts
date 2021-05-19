import {Component, Input, OnInit} from '@angular/core';
import {UserDeliveryAddressResponse} from '../../../../entity/address/user-delivery-address-response';
import {GoodsOrderDeliveryDetailsResponse} from '../../../../entity/order/goods-order-delivery-details-response';

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss']
})
export class AddressViewComponent implements OnInit {

  constructor() {
  }

  // @ts-ignore
  @Input() address: UserDeliveryAddressResponse;

  ngOnInit(): void {
  }

  makeAddressFromDeliveryDetails(details: GoodsOrderDeliveryDetailsResponse): void {
    this.address = new UserDeliveryAddressResponse();
    this.address.country = {
      englishName: details.countryCode
    };
    this.address.region = details.region;
    this.address.city = details.city;
    this.address.house = details.house;
    this.address.street = details.street;
    this.address.phoneNumber = details.phoneNumber;
    this.address.recipient = details.recipient;
  }

}
