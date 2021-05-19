import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';
import {OrderService} from '../../../../service/order/order.service';
import {NavigationService} from '../../../../common/navigation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChooseOrderDeliveryComponent} from '../../../common/order-making/choose-order-delivery/choose-order-delivery.component';
import {ChooseOrderPaymentComponent} from '../../../common/order-making/choose-order-payment/choose-order-payment.component';
import {AddressViewComponent} from '../../../common/address/address-view/address-view.component';
import {DeliveryTypeResponse} from '../../../../entity/country/delivery-type-response';
import {OrderItemListViewComponent} from '../../../common/cart-order/order/order-item-list-view/order-item-list-view.component';
import {SumEnterRowComponent} from './sum-enter-row/sum-enter-row.component';
import {GoodsOrderSellerConfirmRequest} from '../../../../entity/order/confirm/goods-order-seller-confirm-request';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(private orderService: OrderService,
              private navigationService: NavigationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  // @ts-ignore
  @ViewChildren(ChooseOrderDeliveryComponent) deliveryComponent: QueryList<ChooseOrderDeliveryComponent>;

  // @ts-ignore
  @ViewChildren(ChooseOrderPaymentComponent) paymentComponent: QueryList<ChooseOrderPaymentComponent>;

  // @ts-ignore
  @ViewChildren(AddressViewComponent) addressComponent: QueryList<AddressViewComponent>;

  // @ts-ignore
  @ViewChildren(OrderItemListViewComponent) itemComponents: QueryList<OrderItemListViewComponent>;

  // @ts-ignore
  @ViewChildren(SumEnterRowComponent) sumComponents: QueryList<SumEnterRowComponent>;

  // @ts-ignore
  goodsOrder: GoodsOrderResponse;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('order'));
    if (isNaN(id)) {
      this.router.navigateByUrl('s');
    }
    this.orderService.getGoodsOrderByIdAndSeller(id).subscribe((r) => {
      this.goodsOrder = r;
      if (this.goodsOrder.orderStatus !== 'WAITING_FOR_SELLER_CONFIRMATION') {
        this.router.navigate(['../main'],
          {relativeTo: this.route, queryParams: {order: r.id, auth: this.navigationService.getAuthNumFromCurrentRoute()}});
      }
      setTimeout(() => {
        this.setUpConfirmationComponents();
      }, 200);
    });
  }

  setUpConfirmationComponents(): void {
    this.deliveryComponent.forEach((d) => {
      d.setChosen(this.goodsOrder.deliveryDetails.delivery);
    });
    this.paymentComponent.first.setUpFromGoodsOrder(this.goodsOrder);
    this.addressComponent.first.makeAddressFromDeliveryDetails(this.goodsOrder.deliveryDetails);
  }

  getPaymentLabel(): string {
    return this.orderService.getPaymentUrkValue(this.goodsOrder.paymentDetails.payment);
  }

  changeDelivery($event: DeliveryTypeResponse): void {
    this.paymentComponent.first.changeSelectByDelivery($event);
  }

  changeCurrency(code: string): void {
    this.goodsOrder.paymentDetails.currency.code = code;
    let sum = 0;
    const items = this.itemComponents.length;
    let ind = 0;
    this.itemComponents.forEach((i) => {
      this.orderService.exchangeItemPrice(i.item.id, code).subscribe((r) => {
        i.item.price = r;
        sum += i.getSum();
        ind++;
        if (ind === items) {
          this.sumComponents.first.setSum(sum);
        }
      });
    });

  }

  confirmOrder(): void {
    const request = new GoodsOrderSellerConfirmRequest();
    request.payment = this.paymentComponent.first.getPaymentRequest();
    request.delivery = this.deliveryComponent.first.chosenDelivery.id;
    request.sum = this.sumComponents.first.sum;
    this.orderService.confirmOrderBySeller(this.goodsOrder.id, request).subscribe(() => {
     window.location.reload();
    });
  }
}
