import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {DeliveryTypeResponse} from '../../../../entity/country/delivery-type-response';
import {GoodsOrderPaymentRequest} from '../../../../entity/order/goods-order-payment-request';
import {GoodsOrderResponse} from '../../../../entity/order/goods-order-response';

@Component({
  selector: 'app-choose-order-payment',
  templateUrl: './choose-order-payment.component.html',
  styleUrls: ['./choose-order-payment.component.scss']
})
export class ChooseOrderPaymentComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  @Output() changeCurrency: EventEmitter<string> = new EventEmitter();

  // @ts-ignore
  currency: string;

  payment: 'AGREEMENT' | 'CASH_ON_DELIVERY' | 'PREPAYMENT' = 'AGREEMENT';

  disablePrepayment = true;
  disableCashOnDelivery = true;
  disableDefault = false;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.currency = params.currency ? params.currency : 'USD';
    });
  }

  changeSelectByDelivery(delivery: DeliveryTypeResponse): void {
    this.disableCashOnDelivery = false;
    this.disablePrepayment = false;
    if (delivery.id === 1) {
      this.payment = 'AGREEMENT';
      this.disableCashOnDelivery = true;
      this.disablePrepayment = true;
      return;
    }
    if (!delivery.cashOnDelivery) {
      if (this.payment === 'CASH_ON_DELIVERY') {
        this.payment = 'AGREEMENT';
      }
      this.disableCashOnDelivery = true;
    }
  }

  setUpFromGoodsOrder(order: GoodsOrderResponse): void {
    this.changeSelectByDelivery(order.deliveryDetails.delivery);
    this.payment = order.paymentDetails.payment;
    this.currency = order.paymentDetails.currency.code;
  }

  changeCurrencySelect($event: any): void {
    this.currency = $event.target.value;
    this.changeCurrency.emit($event.target.value);
  }

  getPaymentRequest(): GoodsOrderPaymentRequest {
    const payment = new GoodsOrderPaymentRequest();
    payment.currency = this.currency;
    payment.method = this.payment;
    return payment;
  }
}
