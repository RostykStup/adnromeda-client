import {Component, Input, OnInit} from '@angular/core';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';
import {AdvertisementService} from '../../../../service/advertisement/advertisement.service';
import {Router} from '@angular/router';
import {OrderService} from '../../../../service/order/order.service';

@Component({
  selector: 'app-order-list-view',
  templateUrl: './order-list-view.component.html',
  styleUrls: ['./order-list-view.component.scss']
})
export class OrderListViewComponent implements OnInit {

  // @ts-ignore
  @Input() order: GoodsOrderResponse;

  @Input() viewMode: 'user' | 'seller' = 'user';

  constructor(private advertisementService: AdvertisementService,
              public orderService: OrderService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  navigateToOrderData(id: number): void {
    window.open('/client/user/order-data?orderId=' + id);
    // this.router.navigateByUrl('/client/seller/order-data?orderId=' + id)
  }

  navigateToSellerOrderData(id: number): void {
    window.open('/client/seller/order-data?orderId=' + id);
    // this.router.navigateByUrl('/client/seller/order-data?orderId=' + id)
  }


  navigateToFeedBackMaking(id: number): void {
    // window.open('/client/user/feedback?orderId=' + id);
    this.router.navigateByUrl('/client/user/feedback?orderId=' + id);
  }

  addOrderToCart(order: GoodsOrderResponse): void {
    const num = order.items.length;
    // let c = 0;
    // order.items.forEach((i) => {
    // this.cartService.addItemToCart(i.advertisementId, i.delivery.id).subscribe(() => {
    //   c++;
    //   if (c === num) {
    //     const dialogRef = this.dialog.open(InfoDialogComponent, {
    //       data: {
    //         text: 'Товари успішно додано до корзини'
    //       }
    //     });
    //     dialogRef.afterClosed().subscribe();
    //   }
    // });
    // });
  }

}
