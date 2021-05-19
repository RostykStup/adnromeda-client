export class GoodsOrderSellerChangeResponse {
  type: 'CHANGE_SUM' | 'CHANGE_DELIVERY' | 'CHANGE_PAYMENT' | 'CHANGE_CURRENCY' = 'CHANGE_SUM';
  // @ts-ignore
  valueFrom: string;
  // @ts-ignore
  valueTo: string;
}
