import {Component, Input, OnInit} from '@angular/core';
import {DeliveryTypeResponse} from '../../../../entity/country/delivery-type-response';
import {DeliveryService} from '../../../../service/country/delivery.service';

@Component({
  selector: 'app-delivery-picker',
  templateUrl: './delivery-picker.component.html',
  styleUrls: ['./delivery-picker.component.scss']
})
export class DeliveryPickerComponent implements OnInit {

  constructor(private deliveryService: DeliveryService) {
  }

  // @ts-ignore
  @Input() advertisementId: number;

  // @ts-ignore
  @Input() chosenDelivery: DeliveryTypeResponse;


  deliveries = new Array<DeliveryTypeResponse>();

  ngOnInit(): void {
    this.deliveryService.getDeliveriesByAdvertisementId(this.advertisementId).subscribe((r) => {
      this.deliveries = r;
      if (this.chosenDelivery === undefined) {
        this.chosenDelivery = this.deliveries[0];
      }
    });

  }

}
