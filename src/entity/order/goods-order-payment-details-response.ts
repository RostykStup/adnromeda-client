import {CurrencyResponse} from '../country/currency-response';

export class GoodsOrderPaymentDetailsResponse {

  // @ts-ignore
  currency: CurrencyResponse;

  payment: 'AGREEMENT' | 'CASH_ON_DELIVERY' | 'PREPAYMENT' = 'AGREEMENT';
}
