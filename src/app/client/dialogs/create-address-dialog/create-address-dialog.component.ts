import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddressService} from '../../../../service/address/address.service';
import {UserDeliveryAddressRequest} from '../../../../entity/address/user-delivery-address-request';

@Component({
  selector: 'app-create-address-dialog',
  templateUrl: './create-address-dialog.component.html',
  styleUrls: ['./create-address-dialog.component.scss']
})
export class CreateAddressDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateAddressDialogComponent>,
    private addressService: AddressService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  address = new UserDeliveryAddressRequest();

}
