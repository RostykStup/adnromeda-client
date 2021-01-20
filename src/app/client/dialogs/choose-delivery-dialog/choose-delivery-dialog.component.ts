import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddressService} from '../../../../service/address/address.service';
import {DeliveryService} from '../../../../service/country/delivery.service';
import {DeliveryTypeResponse} from '../../../../entity/country/delivery-type-response';

@Component({
  selector: 'app-choose-delivery-dialog',
  templateUrl: './choose-delivery-dialog.component.html',
  styleUrls: ['../../../../styles/input.scss', '../../../../styles/button.scss', './choose-delivery-dialog.component.scss']
})
export class ChooseDeliveryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ChooseDeliveryDialogComponent>,
    public deliveryService: DeliveryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.deliveryService.getDeliveriesByAdvertisementId(data.advertisementId).subscribe((r) => {
      this.deliveries = r;
      this.userDelivery = data.delivery;
    });
  }

  userDelivery = new DeliveryTypeResponse();

  deliveries = new Array<DeliveryTypeResponse>();

  changeCheck(target: any): void {
    this.userDelivery = this.getDeliveryById(target.value);
  }


  getDeliveryById(id: number): DeliveryTypeResponse {
    let del = new DeliveryTypeResponse();
    this.deliveries.forEach((d) => {
      if (d.id == id) {
        del = d;
      }
    });
    return del;
  }

  clickChooseDeliveryButton(): void {
    this.data.delivery = this.userDelivery;
    this.dialogRef.close(this.data);
  }

  chooseDelivery(delivery: DeliveryTypeResponse): void {
    this.userDelivery = delivery;
  }
}
