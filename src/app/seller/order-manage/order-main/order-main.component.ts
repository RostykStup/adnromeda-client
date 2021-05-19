import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {OrderService} from '../../../../service/order/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';
import {NavigationService} from '../../../../common/navigation.service';
import {AddressViewComponent} from '../../../common/address/address-view/address-view.component';

@Component({
  selector: 'app-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.scss']
})
export class OrderMainComponent implements OnInit {

  constructor(private orderService: OrderService,
              private navigationService: NavigationService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  // @ts-ignore
  @ViewChildren(AddressViewComponent) addressComponent: QueryList<AddressViewComponent>;

  // @ts-ignore
  goodsOrder: GoodsOrderResponse;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('order'));
    if (isNaN(id)) {
      this.router.navigateByUrl('s');
    }

    this.orderService.getGoodsOrderByIdAndSeller(id).subscribe((r) => {
      this.goodsOrder = r;
      if (this.goodsOrder.orderStatus === 'WAITING_FOR_SELLER_CONFIRMATION') {
        this.router.navigate(['confirmation'],
          {relativeTo: this.route, queryParams: {order: r.id, auth: this.navigationService.getAuthNumFromCurrentRoute()}});
      }
      setTimeout(() => {
        this.setUpComponents();
      }, 200);
    });
  }

  setUpComponents(): void {
    this.addressComponent.first.makeAddressFromDeliveryDetails(this.goodsOrder.deliveryDetails);
  }


  getOrderStatus(): string {
    return this.orderService.getUkrOrderStatusValue(this.goodsOrder.orderStatus);
  }
}
