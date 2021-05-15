import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ParametersValuesPriceCountRequest} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-request';
import {ParameterRequest} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameter-request';
import {ParametersValuesCurrencyPriceRequest} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-currency-price-request';
import {GoodsCurrencyPriceInputComponent} from '../goods-currency-price-input/goods-currency-price-input.component';

@Component({
  selector: 'app-goods-param-values-price-count-element',
  templateUrl: './goods-param-values-price-count-element.component.html',
  styleUrls: ['./goods-param-values-price-count-element.component.scss']
})
export class GoodsParamValuesPriceCountElementComponent implements OnInit {

  constructor() {
  }

  // @ts-ignore
  @Input() paramValuePriceCount: ParametersValuesPriceCountRequest;

  // @ts-ignore
  @Input() parameters: Array<ParameterRequest>;
  @Input() default = false;
  @Output() changeParamPriceCount: EventEmitter<ParametersValuesPriceCountRequest> = new EventEmitter();
  // @ts-ignore
  @Input() currencies: Array<string>;

  // @ts-ignore
  @ViewChildren(GoodsCurrencyPriceInputComponent) currencyPriceComponents: QueryList<GoodsCurrencyPriceInputComponent>;

  countValidation = true;

  ngOnInit(): void {
  }

  changeCountInput($event: any): void {
    const value = $event.target.value;
    this.countValidation = this.isNumberWithOutDot(value);
    if (this.countValidation) {
      this.paramValuePriceCount.count = +value;
    }
  }

  isNumberWithOutDot(value: string): boolean {
    return !isNaN(Number(value)) && Number(value) % 1 === 0 && Number(value) >= 0;
  }

  isValid(): boolean {
    let pricesValidation = true;
    this.currencyPriceComponents.forEach((c) => {
      if (!c.isValid()) {
        pricesValidation = false;
      }
    });
    return pricesValidation && this.countValidation;
  }

  emitChange(): void {
    if (this.isValid()) {
      this.changeParamPriceCount.emit(this.paramValuePriceCount);
    }
  }

  insertCurrency(currency: string): void {
    this.paramValuePriceCount.prices.push(new ParametersValuesCurrencyPriceRequest(currency));
  }

  changeCurrencyPrice(currencyPrice: ParametersValuesCurrencyPriceRequest, i: number): void {
    this.paramValuePriceCount.prices[i] = currencyPrice;
  }

  removeCurrency(currency: string): void {
    let index = -1;
    for (let i = 0; i < this.paramValuePriceCount.prices.length; i++) {
      if (this.paramValuePriceCount.prices[i].currencyCode === currency) {
        index = i;
      }
    }
    if (index !== -1) {
      this.paramValuePriceCount.prices.splice(index, 1);
    }
    // this.paramValuePriceCount.prices.push(new ParametersValuesCurrencyPriceRequest(currency));
  }
}
