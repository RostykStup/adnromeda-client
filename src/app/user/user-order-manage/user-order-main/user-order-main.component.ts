import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';
import {OrderService} from '../../../../service/order/order.service';
import {NavigationService} from '../../../../common/navigation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AddressViewComponent} from '../../../common/address/address-view/address-view.component';

@Component({
  selector: 'app-user-order-main',
  templateUrl: './user-order-main.component.html',
  styleUrls: ['./user-order-main.component.scss']
})
export class UserOrderMainComponent implements OnInit {

  constructor(private orderService: OrderService,
              private navigationService: NavigationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  // @ts-ignore
  goodsOrder: GoodsOrderResponse;

  // @ts-ignore
  @ViewChildren(AddressViewComponent) addressComponent: QueryList<AddressViewComponent>;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('order'));
    if (isNaN(id)) {
      this.router.navigateByUrl('u');
    }
    this.orderService.getGoodsOrderByIdAndUser(id).subscribe((r) => {
      this.goodsOrder = r;
      console.log(r);
      setTimeout(() => {
        this.setUpComponents();
      }, 200);
    });
  }

  setUpComponents(): void {
    this.addressComponent.first.makeAddressFromDeliveryDetails(this.goodsOrder.deliveryDetails);
  }

  getUrkPaymentName(): string {
    return this.orderService.getPaymentUrkValue(this.goodsOrder.paymentDetails.payment);
  }

}
