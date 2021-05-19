import {Component, OnInit} from '@angular/core';
import {AddressService} from '../../../../service/address/address.service';
import {UserDeliveryAddressResponse} from '../../../../entity/address/user-delivery-address-response';

@Component({
  selector: 'app-choose-order-address',
  templateUrl: './choose-order-address.component.html',
  styleUrls: ['./choose-order-address.component.scss']
})
export class ChooseOrderAddressComponent implements OnInit {

  constructor(private addressService: AddressService) {
  }

  // @ts-ignore
  address: UserDeliveryAddressResponse;

  ngOnInit(): void {
    this.addressService.getDefaultUserAddress().subscribe((r) => {
      this.address = r;
    });
  }

  getAddress(): UserDeliveryAddressResponse {
    return this.address;
  }

}
