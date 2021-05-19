import {Component, Input, OnInit} from '@angular/core';
import {GoodsOrderResponse} from '../../../../../entity/order/goods-order-response';

@Component({
  selector: 'app-sum-enter-row',
  templateUrl: './sum-enter-row.component.html',
  styleUrls: ['./sum-enter-row.component.scss']
})
export class SumEnterRowComponent implements OnInit {

  constructor() {
  }

  // @ts-ignore
  @Input() order: GoodsOrderResponse;

  priceValid = true;
  sum = 0;

  ngOnInit(): void {
    this.sum = 0;
    this.order.items.forEach((i) => {
      this.sum += (i.price * i.count);
    });
  }

  changePriceInput($event: any): void {
    const value = $event.target.value;
    this.priceValid = this.isNumber(value);
    if (this.priceValid) {
      this.sum = value;
    }
  }

  isNumber(value: string): boolean {
    return !isNaN(Number(value)) && Number(value) > 0;
  }

  setSum(sum: number): void {
    this.sum = sum;
  }

  isValid(): boolean {
    return this.priceValid;
  }

}
