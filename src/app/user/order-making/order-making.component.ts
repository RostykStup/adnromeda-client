import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CartService} from '../../../service/cart/cart.service';
import {AddressService} from '../../../service/address/address.service';
import {CartSellerPositionResponse} from '../../../entity/cart/cart-seller-position-response';
import {AdvertisementService} from '../../../service/advertisement/advertisement.service';
import {MatDialog} from '@angular/material/dialog';
import {DeliveryTypeResponse} from '../../../entity/country/delivery-type-response';
import {OrderService} from '../../../service/order/order.service';
import {ChooseOrderPaymentComponent} from '../../common/order-making/choose-order-payment/choose-order-payment.component';
import {CookieService} from 'ngx-cookie-service';
import {DeliveryService} from '../../../service/country/delivery.service';
import {ChooseOrderItemsListComponent} from '../../common/order-making/choose-order-items-list/choose-order-items-list.component';
import {GoodsOrderRequest} from '../../../entity/order/goods-order-request';
import {ChooseOrderAddressComponent} from '../../common/order-making/choose-order-address/choose-order-address.component';
import {ChooseOrderDeliveryComponent} from '../../common/order-making/choose-order-delivery/choose-order-delivery.component';

@Component({
  selector: 'app-order-making',
  templateUrl: './order-making.component.html',
  styleUrls: ['./order-making.component.scss']
})
export class OrderMakingComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private cartService: CartService,
              private addressService: AddressService,
              private advertisementService: AdvertisementService,
              private orderService: OrderService,
              public dialog: MatDialog) {
  }

  // @ts-ignore
  @ViewChildren(ChooseOrderPaymentComponent) paymentComponent: QueryList<ChooseOrderPaymentComponent>;
  // @ts-ignore
  @ViewChildren(ChooseOrderItemsListComponent) itemList: QueryList<ChooseOrderItemsListComponent>;
  // @ts-ignore
  @ViewChildren(ChooseOrderDeliveryComponent) deliveryComponent: QueryList<ChooseOrderDeliveryComponent>;
  // @ts-ignore
  @ViewChildren(ChooseOrderAddressComponent) addressComponent: QueryList<ChooseOrderAddressComponent>;

  // @ts-ignore
  position: CartSellerPositionResponse;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.cartItemsId !== undefined) {
        const ids = params.cartItemsId.split(',');
        const currency = params.currency ? params.currency : 'USD';
        this.cartService.exchangeSellerPositionCurrency(currency, ids).subscribe((r) => {
          this.position = r;
        });
      }
    });
  }


  changeDelivery($event: DeliveryTypeResponse): void {
    this.paymentComponent.first.changeSelectByDelivery($event);
  }

  changeCurrency(currency: string): void {
    this.itemList.first.exchangeItems(currency);
  }

  makeOrder(): void {
    const request = new GoodsOrderRequest();
    request.addressId = this.addressComponent.first.getAddress().id;
    request.payment = this.paymentComponent.first.getPaymentRequest();
    request.delivery = this.deliveryComponent.first.chosenDelivery.id;
    request.items = this.itemList.first.getItemsList();
    request.sum = this.itemList.first.sum;
    console.log(request);
    this.orderService.createOrder(request).subscribe(() => {
      this.router.navigateByUrl('');
    });
  }
}
