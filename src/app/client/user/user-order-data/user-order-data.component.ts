import {Component, OnInit} from '@angular/core';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';
import {ActivatedRoute, Params} from '@angular/router';
import {OrderService} from '../../../../service/order/order.service';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {ConfirmGoodsOrderDeliveryRequest} from '../../../../entity/order/confirm-goods-order-delivery-request';

@Component({
  selector: 'app-user-order-data',
  templateUrl: './user-order-data.component.html',
  styleUrls: ['../../../../styles/input.scss', './user-order-data.component.scss']
})
export class UserOrderDataComponent implements OnInit {

  order = new GoodsOrderResponse();

  selectAll = false;

  constructor(private activatedRoute: ActivatedRoute,
              public orderService: OrderService,
              private advertisementService: AdvertisementService) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.orderService.getGoodsOrderByIdAndUser(params.orderId).subscribe((r) => {
        this.order = r;
        console.log(this.order.deliveryDetails.sellerMessage);
      });
    });
  }

  ngOnInit(): void {
  }

  getImage(image: string | null, sellerId: number): string {
    return this.advertisementService.getAdvertisementImagePath(image, sellerId);
  }

  clickSelectAll(): void {
    this.order.items.forEach((i) => {
      i.checked = this.selectAll;
    });
  }

  checkItem(): void {
    let isAllChecked = true;
    this.order.items.forEach((i) => {
      if (!i.checked) {
        isAllChecked = false;
      }
    });
    this.selectAll = isAllChecked;
  }

  confirmDeliveryButtonClick(): void {
    console.log(this.getCheckedNumber());
    if (this.getCheckedNumber() > 0) {
      const request = new ConfirmGoodsOrderDeliveryRequest();
      request.orderId = this.order.id;
      this.order.items.forEach((i) => {
        if (i.checked) {
          request.orderItems.push(i.id);
        }
      });
      this.orderService.confirmGoodsOrderDelivery(request).subscribe(() => {
        window.location.reload();
      });
    } else {
      alert('Виберіть товари для підтвердження');
    }
  }

  getCheckedNumber(): number {
    let n = 0;
    this.order.items.forEach((i) => {
      if (i.checked) {
        n++;
      }
    });
    return n;
  }


}
