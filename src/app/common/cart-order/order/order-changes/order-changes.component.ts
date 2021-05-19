import {Component, Input, OnInit} from '@angular/core';
import {GoodsOrderResponse} from '../../../../../entity/order/goods-order-response';
import {GoodsOrderSellerChangeResponse} from '../../../../../entity/order/change/goods-order-seller-change-response';
import {OrderService} from '../../../../../service/order/order.service';

@Component({
  selector: 'app-order-changes',
  templateUrl: './order-changes.component.html',
  styleUrls: ['./order-changes.component.scss']
})
export class OrderChangesComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }

  // @ts-ignore
  @Input() goodsOrder: GoodsOrderResponse;

  ngOnInit(): void {
  }

  getChangeLabelByChange(change: GoodsOrderSellerChangeResponse): string {
    switch (change.type) {
      case 'CHANGE_CURRENCY':
        return this.getChangeCurrencyLabel(change);
      case 'CHANGE_SUM':
        return this.getChangeSumLabel(change);
      case 'CHANGE_DELIVERY':
        return this.getChangeDeliveryLabel(change);
      case 'CHANGE_PAYMENT':
        return this.getChangePaymentLabel(change);
    }
    return '';
  }

  getChangeCurrencyLabel(change: GoodsOrderSellerChangeResponse): string {
    return 'Валюту оплати змінено з ' + change.valueFrom + ' на ' + change.valueTo;
  }

  getChangeDeliveryLabel(change: GoodsOrderSellerChangeResponse): string {
    if (change.valueFrom === 'default') {
      return 'Службу доставки встановлено ' + change.valueTo;
    } else {
      return 'Службу доставки змінено з ' + change.valueFrom + ' на ' + change.valueTo;
    }
  }

  getChangePaymentLabel(change: GoodsOrderSellerChangeResponse): string {
    if (change.valueFrom === 'AGREEMENT') {
      // @ts-ignore
      return 'Спосіб оплати встановлено ' + this.orderService.getPaymentUrkValue(change.valueTo);
    } else {
      // @ts-ignore
      // tslint:disable-next-line:max-line-length
      return 'Спосіб оплати змінено з ' + this.orderService.getPaymentUrkValue(change.valueFrom) + ' на ' + this.orderService.getPaymentUrkValue(change.valueTo);
    }
  }

  getChangeSumLabel(change: GoodsOrderSellerChangeResponse): string {
    // @ts-ignore
    return 'Суму замовлення змінено з ' +  Number(change.valueFrom).toFixed(2) + ' ' + this.getCurrencyBeforeChange() + ' на ' + Number(change.valueTo).toFixed(2) + ' ' + this.goodsOrder.paymentDetails.currency.code;
  }

  getCurrencyBeforeChange(): string {
    let currency = this.goodsOrder.paymentDetails.currency.code;
    this.goodsOrder.changes.forEach((c) => {
      if (c.type === 'CHANGE_CURRENCY') {
        currency = c.valueFrom;
      }
    });
    return currency;
  }

}
