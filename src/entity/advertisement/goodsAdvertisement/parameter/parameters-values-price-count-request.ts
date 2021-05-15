import {ParametersValuesCurrencyPriceRequest} from './parameters-values-currency-price-request';

export class ParametersValuesPriceCountRequest {
  valueParam = new Map<string, string>();
  prices = new Array<ParametersValuesCurrencyPriceRequest>();
  count = 0;


  constructor() {
    this.prices.push(new ParametersValuesCurrencyPriceRequest('USD'));
  }
}
