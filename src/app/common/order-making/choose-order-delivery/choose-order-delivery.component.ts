import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeliveryService} from '../../../../service/country/delivery.service';
import {DeliveryTypeResponse} from '../../../../entity/country/delivery-type-response';


@Component({
  selector: 'app-choose-order-delivery',
  templateUrl: './choose-order-delivery.component.html',
  styleUrls: ['./choose-order-delivery.component.scss']
})
export class ChooseOrderDeliveryComponent implements OnInit {


  // @ts-ignore
  @Input() sellerId: number;

  deliveries = new Array<DeliveryTypeResponse>();

  // @ts-ignore
  chosenDelivery: DeliveryTypeResponse;

  @Output() changeDelivery: EventEmitter<DeliveryTypeResponse> = new EventEmitter();

  constructor(public deliveryService: DeliveryService) {
    this.chosenDelivery = deliveryService.getDefaultDeliveryType();
  }

  ngOnInit(): void {
    this.deliveryService.getDeliveriesBySellerId(this.sellerId).subscribe((r) => {
      this.deliveries = r;
    });
  }

  setChosen(delivery: DeliveryTypeResponse): void {
    this.chosenDelivery = delivery;
  }

  emitDeliveryChange(delivery: DeliveryTypeResponse): void {
    this.chosenDelivery = delivery;
    this.changeDelivery.emit(delivery);
  }
}
