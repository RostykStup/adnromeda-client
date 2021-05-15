export class ParametersValuesCurrencyPriceRequest {
  price = 0;
  currencyCode = 'USD';


  constructor(currencyCode: string) {
    this.currencyCode = currencyCode;
  }
}
