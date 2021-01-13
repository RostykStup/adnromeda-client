import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddressService} from '../../../../service/address/address.service';
import {UserDeliveryAddressResponse} from '../../../../entity/address/user-delivery-address-response';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-choose-address-dialog',
  templateUrl: './choose-address-dialog.component.html',
  styleUrls: ['../../../../styles/button.scss', './choose-address-dialog.component.scss']
})
export class ChooseAddressDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<ChooseAddressDialogComponent>,
    private addressService: AddressService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.openActions();
    this.defaultId = data.addressId;
  }

  defaultId = 0;
  addresses = new Array<UserDeliveryAddressResponse>();

  openActions(): void {
    this.addressService.getAllUserAddresses().subscribe((r) => {
      this.addresses = r;
    });
  }

  closeWithAddress(address: UserDeliveryAddressResponse): void {
    this.data.address = address;
    this.data.defaultId = this.defaultId;
    this.dialogRef.close(this.data);
  }


  makeAddressDefault(id: number): void {
    this.addressService.makeAddressDefault(id).subscribe(() => {
      this.defaultId = id;
    });
  }
}
