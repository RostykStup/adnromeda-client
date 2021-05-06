import {Component, Input, OnInit} from '@angular/core';
import {GoodsOrderItemResponse} from '../../../../entity/order/goods-order-item-response';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';
import {OrderService} from '../../../../service/order/order.service';

@Component({
  selector: 'app-order-item-list-view',
  templateUrl: './order-item-list-view.component.html',
  styleUrls: ['./order-item-list-view.component.scss']
})
export class OrderItemListViewComponent implements OnInit {

  // @ts-ignore
  @Input() orderItem: GoodsOrderItemResponse;
  // @ts-ignore
  @Input() order: GoodsOrderResponse;

  constructor(private advertisementService: AdvertisementService,
              public orderService: OrderService,) {
  }

  ngOnInit(): void {
  }

  getImage(image: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(image, sellerId);
  }

}
