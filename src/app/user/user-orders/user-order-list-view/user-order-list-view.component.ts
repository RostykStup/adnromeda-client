import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../../../service/order/order.service';
import {NavigationService} from '../../../../common/navigation.service';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';

@Component({
  selector: 'app-user-order-list-view',
  templateUrl: './user-order-list-view.component.html',
  styleUrls: ['./user-order-list-view.component.scss']
})
export class UserOrderListViewComponent implements OnInit {

  constructor(private orderService: OrderService,
              private navigationService: NavigationService) {
  }

  // @ts-ignore
  @Input() goodsOrder: GoodsOrderResponse;

  ngOnInit(): void {
  }

  getUkrOrderStatus(): string {
    console.log(this.orderService.getUkrOrderStatusForUserValue(this.goodsOrder.orderStatus));
    return this.orderService.getUkrOrderStatusForUserValue(this.goodsOrder.orderStatus);
  }

  getOrderURL(): string {
    return 'u/order-manage?order=' + this.goodsOrder.id + '&' + this.navigationService.getAuthQueryFromRoute();
  }
}
