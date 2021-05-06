import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddressService} from '../../../service/address/address.service';
import {DeliveryService} from '../../../service/country/delivery.service';
import {DeliveryTypeResponse} from '../../../entity/country/delivery-type-response';
import {RestCountry} from '../../../entity/country/rest-country';

@Component({
  selector: 'app-choose-delivery-dialog',
  templateUrl: './choose-delivery-dialog.component.html',
  styleUrls: ['./choose-delivery-dialog.component.scss']
})
export class ChooseDeliveryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ChooseDeliveryDialogComponent>,
    public deliveryService: DeliveryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.deliveryService.getDeliveriesByAdvertisementId(data.advertisementId).subscribe((r) => {
      this.deliveries = r;
      this.userDelivery = data.delivery;
      if (data.userCountry) {
        this.deliveryTo = data.userCountry.alpha2Code;
        if (data.sellerCountry) {
          this.deliveryFrom = data.sellerCountry;
          this.clearDeliveriesByInternational();
        }
      }
    });
  }

  userDelivery = new DeliveryTypeResponse();

  deliveries = new Array<DeliveryTypeResponse>();

  deliveryTo: string | null = null;

  deliveryFrom: string | null = null;

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

  clearDeliveriesByInternational(): void {
    if (this.deliveryTo !== this.deliveryFrom) {
      this.deliveries.forEach((d) => {
        if (!d.isInternational) {
          this.deliveries.splice(this.deliveries.indexOf(d), 1);
        }
      });
    }
  }

  clickChooseDeliveryButton(): void {
    this.data.delivery = this.userDelivery;
    this.dialogRef.close(this.data);
  }

  chooseDelivery(delivery: DeliveryTypeResponse): void {
    this.userDelivery = delivery;
  }
}
