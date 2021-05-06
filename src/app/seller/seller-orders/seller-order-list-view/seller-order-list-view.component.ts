import {Component, Input, OnInit} from '@angular/core';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';
import {OrderService} from '../../../../service/order/order.service';

@Component({
  selector: 'app-seller-order-list-view',
  templateUrl: './seller-order-list-view.component.html',
  styleUrls: ['./seller-order-list-view.component.scss']
})
export class SellerOrderListViewComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }

  // @ts-ignore
  @Input() goodsOrder: GoodsOrderResponse;

  ngOnInit(): void {
  }

  getUkrOrderStatus(): string {
    return this.orderService.getUkrOrderStatusValue(this.goodsOrder.orderStatus);
  }

}
