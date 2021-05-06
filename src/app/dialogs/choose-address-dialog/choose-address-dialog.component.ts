import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddressService} from '../../../service/address/address.service';
import {UserDeliveryAddressResponse} from '../../../entity/address/user-delivery-address-response';
import {Observable} from 'rxjs';
import {CreateAddressDialogComponent} from '../create-address-dialog/create-address-dialog.component';

@Component({
  selector: 'app-choose-address-dialog',
  templateUrl: './choose-address-dialog.component.html',
  styleUrls: ['./choose-address-dialog.component.scss']
})
export class ChooseAddressDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<ChooseAddressDialogComponent>,
    private addressService: AddressService,
    private dialog: MatDialog,
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

  openAddressCreation(): void {
    const dialogRef = this.dialog.open(CreateAddressDialogComponent, {
      width: '55%',
      panelClass: 'create-address-dialog'
      // height: '500px'
    });

    dialogRef.afterClosed().subscribe((newAddress) => {
      if (newAddress !== undefined) {
        this.data.address = newAddress;
        this.dialogRef.close(this.data);
      }
    });
  }
}
