import {Component, Input, OnInit} from '@angular/core';
import {GoodsOrderDeliveryDetailsResponse} from '../../../../entity/order/goods-order-delivery-details-response';

@Component({
  selector: 'app-delivery-details-view',
  templateUrl: './delivery-details-view.component.html',
  styleUrls: ['./delivery-details-view.component.scss']
})
export class DeliveryDetailsViewComponent implements OnInit {

  constructor() {
  }

  // @ts-ignore
  @Input details: GoodsOrderDeliveryDetailsResponse;

  ngOnInit(): void {
  }

}
