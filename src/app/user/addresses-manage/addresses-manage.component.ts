import {Component, OnInit} from '@angular/core';
import {AddressService} from '../../../service/address/address.service';
import {UserDeliveryAddressResponse} from '../../../entity/address/user-delivery-address-response';
import {CreateAddressDialogComponent} from '../../dialogs/create-address-dialog/create-address-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {InfoDialogComponent} from '../../dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-addresses-manage',
  templateUrl: './addresses-manage.component.html',
  styleUrls: ['./addresses-manage.component.scss']
})
export class AddressesManageComponent implements OnInit {

  constructor(private addressService: AddressService,
              private dialog: MatDialog) {
  }

  addresses = new Array<UserDeliveryAddressResponse>();
  defaultAddress = new UserDeliveryAddressResponse();

  ngOnInit(): void {
    this.addressService.getAllUserAddresses().subscribe((r) => {
      this.addresses = r;
      this.addressService.getDefaultUserAddress().subscribe((r) => {
        this.defaultAddress = r;
        console.log(this.defaultAddress);
        console.log(this.addresses);
      });
    });
  }

  addNewAddress(): void {
    const dialogRef = this.dialog.open(CreateAddressDialogComponent, {
      width: '55%',
      panelClass: 'create-address-dialog'
    });

    dialogRef.afterClosed().subscribe((newAddress) => {
      if (newAddress !== undefined) {
        this.addresses.push(newAddress);
      }
    });
  }

  makeAddressDefault(address: UserDeliveryAddressResponse): void {
    this.addressService.makeAddressDefault(address.id).subscribe(() => {
      window.location.reload();
    });
  }

  updateDeliveryAddress(address: UserDeliveryAddressResponse): void {
    const dialogRef = this.dialog.open(CreateAddressDialogComponent, {
      width: '55%',
      data: {address},
      panelClass: 'create-address-dialog'
    });

    dialogRef.afterClosed().subscribe((newAddress) => {
      if (newAddress !== undefined) {
        window.location.reload();
      }
    });
  }

  deleteAddress(id: number): void {
    if (this.defaultAddress.id !== id) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          text: 'Видалити цю адресу?'
        }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data.result) {
          this.addressService.deleteAddress(id).subscribe(() => {
            window.location.reload();
          })
        }
      });
    } else {
      const dataValid = {
        text: 'Неможливо видалити адресу за замовчуванням'
      };

      const dialogRef = this.dialog.open(InfoDialogComponent, {
        data: dataValid
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }

  }
}
