import {Component, Input, OnInit} from '@angular/core';
import {GoodsOrderItemResponse} from '../../../../../entity/order/goods-order-item-response';
import {AdvertisementService} from '../../../../../service/advertisement/advertisement.service';
import {GoodsOrderResponse} from '../../../../../entity/order/goods-order-response';
import {OrderService} from '../../../../../service/order/order.service';

@Component({
  selector: 'app-order-item-list-view',
  templateUrl: './order-item-list-view.component.html',
  styleUrls: ['./order-item-list-view.component.scss']
})
export class OrderItemListViewComponent implements OnInit {

  constructor(private advertisementService: AdvertisementService, private orderService: OrderService) {
  }

  // @ts-ignore
  @Input() item: GoodsOrderItemResponse;

  // @ts-ignore
  @Input() order: GoodsOrderResponse;

  ngOnInit(): void {
  }

  getItemImage(): string {
    return this.advertisementService.getAdvertisementImagePath(this.item.image, this.order.sellerId);
  }

  getSum(): number {
    return this.item.price * this.item.count;
  }


}
