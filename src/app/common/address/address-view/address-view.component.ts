import {Component, Input, OnInit} from '@angular/core';
import {UserDeliveryAddressResponse} from '../../../../entity/address/user-delivery-address-response';

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

}
