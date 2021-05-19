import {Component, Input, OnInit} from '@angular/core';
import {GoodsOrderResponse} from '../../../../../entity/order/goods-order-response';
import {GoodsOrderDeliveryDetailsForShipmentRequest} from '../../../../../entity/order/goods-order-delivery-details-for-shipment-request';
import {OrderService} from '../../../../../service/order/order.service';

@Component({
  selector: 'app-delivery-manage',
  templateUrl: './delivery-manage.component.html',
  styleUrls: ['./delivery-manage.component.scss']
})
export class DeliveryManageComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }

  // @ts-ignore
  @Input() order: GoodsOrderResponse;

  shipmentRequest = new GoodsOrderDeliveryDetailsForShipmentRequest();

  ngOnInit(): void {
  }

  sendConfirmSending(): void {
    this.orderService.confirmGoodsOrderSending(this.order.id, this.shipmentRequest).subscribe(() => {
      window.location.reload();
    });
  }
}
