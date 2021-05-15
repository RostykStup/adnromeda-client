import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParametersValuesPriceCountRequest} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-price-count-request';
import {ParametersValuesCurrencyPriceRequest} from '../../../../../entity/advertisement/goodsAdvertisement/parameter/parameters-values-currency-price-request';

@Component({
  selector: 'app-goods-currency-price-input',
  templateUrl: './goods-currency-price-input.component.html',
  styleUrls: ['./goods-currency-price-input.component.scss']
})
export class GoodsCurrencyPriceInputComponent implements OnInit {

  constructor() {

  }

  // @ts-ignore
  @Input() currency: string;
  // @ts-ignore
  @Input() currencyPrice: ParametersValuesCurrencyPriceRequest;
  @Output() changePrice: EventEmitter<ParametersValuesCurrencyPriceRequest> = new EventEmitter();

  priceValidation = false;

  ngOnInit(): void {
    this.currencyPrice = new ParametersValuesCurrencyPriceRequest(this.currency);
  }

  changePriceInput($event: any): void {
    const value = $event.target.value;
    this.priceValidation = this.isNumber(value);
    if (this.priceValidation) {
      this.currencyPrice.price = +(value);
      this.changePrice.emit(this.currencyPrice);
    }
  }

  isNumber(value: string): boolean {
    return !isNaN(Number(value)) && Number(value) > 0;
  }

  isValid(): boolean {
    return this.priceValidation;
  }

}
