import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddressService} from '../../../service/address/address.service';
import {UserDeliveryAddressResponse} from '../../../entity/address/user-delivery-address-response';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    private addressService: AddressService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public image: string) {
  }

  ngOnInit(): void {
  }

}
